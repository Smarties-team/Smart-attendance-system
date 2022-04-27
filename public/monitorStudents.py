import imp
from turtle import st
import face_recognition
import cv2
import time
from imutils import paths
import imutils
import os
import sys
import traceback
import pickle
from datetime import datetime

# from matplotlib.pyplot import draw
from PIL import Image, ImageDraw
import numpy as np

import mysql.connector as msql

import requests

# Take the argument from the command line?

webcams = ["http://192.168.1.2:8080/photo.jpg"]

# Return an image capture from the camera stream


def capture(camera_id):

    image = None

    try:

        # capture from URL stream
        img_resp = requests.get(webcams[camera_id])
        img_arr = np.array(bytearray(img_resp.content), dtype=np.uint8)
        image = cv2.imdecode(img_arr, -1)
        image = imutils.resize(image, width=1000, height=1800)

    # Use default image stored in the disk
    except Exception as e:
        print("Failed to capture image from web camera, the default image is used instead")
        imgPath = "../storage/app/bill-steve-elon.jpg"
        image = face_recognition.load_image_file(imgPath)

    return image


def faceRecognition(image, students_faces):

    (id, known_face_names, known_face_encodings) = zip(*students_faces)
    present_students = []

    face_locations = face_recognition.face_locations(image)

    # Vaildate existance
    if len(face_locations) < 1:
        print("No faces detected")
        return []

    face_encodings = face_recognition.face_encodings(
        image, num_jitters=10)

    # Iterate over each face in the captured image
    for face_location, face_encoding in zip(face_locations, face_encodings):

        # Extract the face in a separate image
        top, right, bottom, left = face_location
        face_image = image[top:bottom, left:right]
        pil_image = Image.fromarray(face_image)
        # pil_image.show()

        # Extract face encodings
        # face_encodings = face_recognition.face_encodings(
        #     pil_image, num_jitters=10)[0]

        # print(face_encodings)
        # Compare the unknown face with our known faces
        # for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(
            known_face_encodings, face_encoding)

        name = "Unknown Person"

        # If match
        if True in matches:
            first_match_index = matches.index(True)
            name = known_face_names[first_match_index]
            present_students.append(first_match_index)

    return present_students


# distance = face_recognition.face_distance([known_face_encoding], unknown_face_encoding)[0]


connection_config_dict = {
    "user": "root",
    "password": "diaa",
    "host": "127.0.0.1",  # default
    "port": "3306",  # default
    "database": "laravel",
    "raise_on_warnings": True,
    "use_pure": False,
    "autocommit": True,
    "pool_size": 5,  # connection pool size
}


def fetchKnownStudents():

    students_faces = []

    # Connect to database
    connection = msql.connect(**connection_config_dict)

    if connection.is_connected() != True:
        raise Exception("Failed to connect to database")

    # Fetch data
    try:
        cursor = connection.cursor()

        cursor.execute(
            "SELECT id, name, face_encoding FROM students WHERE grade=3")

        students = cursor.fetchall()

        for student in students:

            (id, name, face_encodings) = student

            # Unpickle face_encodings blob to an array
            face_encodings = pickle.loads(face_encodings)

            # Append
            students_faces.append((id, name, face_encodings))

        return students_faces

    except Exception as e:
        print("Exception occurred ", e)
        return []

    finally:
        cursor.close()
        connection.close()

# Log present students in the DB


def logStudents(all_students, present_students):

    # Connect to database
    connection = msql.connect(**connection_config_dict)

    if connection.is_connected() != True:
        raise Exception("Failed to connect to database")

    try:
        cursor = connection.cursor()

        for idx in range(len(all_students)):

            id = all_students[idx][0]

            # Read from the log table, the lastest enterance record for this student id
            sqlStmt = """SELECT sl.student_id, sl.entered_at, sl.left_at 
                        FROM students_logs sl 
                        JOIN (select student_id, max(entered_at) as entered_at from students_logs group by student_id) as m
                        on sl.student_id = m.student_id and sl.entered_at = m.entered_at where sl.student_id = %s"""

            vals = (id,)
            cursor.execute(sqlStmt, vals)

            students = cursor.fetchall()
            rows_count = len(students)

            # No records found
            if(rows_count == 0):
                (entered_at, left_at) = (None, None)
            else:
                (id, entered_at, left_at) = students[0]

            # If present
            if idx in present_students:
                if(rows_count == 0 or left_at != None):
                    # Create new record with current time as entering time
                    sqlStmt = "INSERT into students_logs (student_id, entered_at) VALUES (%s, %s)"
                    vals = (id, datetime.now())
                    cursor.execute(sqlStmt, vals)

                    # Validate insertion

            # Absent
            else:
                # Was present ?
                if(rows_count != 0 and left_at == None):
                    # Update the left at to current time
                    sqlStmt = "UPDATE students_logs SET left_at = %s WHERE student_id = %s AND entered_at = %s"
                    vals = (datetime.now(), id, entered_at)
                    cursor.execute(sqlStmt, vals)

                    # Validate update

        # # Validate the affected rows count
        # result = cursor.rowcount
        # if result == 1:
        #     print("Success")
        # else:
        #     raise Exception("Rows affected should be 1, but got: ", result)

    finally:
        cursor.close()
        connection.close()


def main():

    try:

        while True:

            # Fetch known face encodings, names arrays from the database
            students_faces = fetchKnownStudents()

            if len(students_faces) > 0:
                print(len(students_faces), " Students retrieved")
            else:
                raise Exception("No students found in the database")

            imgCapture = capture(0)
            present_students = faceRecognition(imgCapture, students_faces)

            print("Present students: ")
            for student in present_students:
                print(students_faces[student][1])

            # log attendance in the Database
            logStudents(students_faces, present_students)

            print("OK")
            # Repeat every 5 mins
            time.sleep(10)

    except Exception as e:
        print("Exception occurred, ", e)
        traceback.print_exc()
        exit()


main()
