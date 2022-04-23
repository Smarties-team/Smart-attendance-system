import imp
import face_recognition
import cv2
import time
from imutils import paths
import os
import sys
import pickle

# from matplotlib.pyplot import draw
from PIL import Image, ImageDraw
import numpy as np

import mysql.connector as msql


# Take the argument from the command line?

# Return an image capture from the camera stream
def capture():
    imgPath = "../storage/app/bill-steve-elon.jpg"
    image = face_recognition.load_image_file(imgPath)
    return image


def faceRecognition(image, students_faces):

    (id, known_face_names, known_face_encodings) = zip(*students_faces)
    present_students = []

    face_locations = face_recognition.face_locations(image)

    # Vaildate existance
    if len(face_locations) < 1:
        print("No face detected")
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
    try:
        connection = msql.connect(**connection_config_dict)

        if connection.is_connected() != True:
            print("Failed to connect to database")
            return []

    except Exception as e:
        print("Failed to connect due to ", e)
        return []

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


def logStudents(all_students, present_students):
    # Store in DB

    # Access database
    try:
        connection = msql.connect(**connection_config_dict)

        if connection.is_connected() != True:
            print("Failed to connect to database")
            exit()

    except Exception as e:
        print("Failed to connect due to ", e)
        exit()

    try:
        cursor = connection.cursor()

        # Read from the log table, the last record for each student id
        # sqlStmt = "UPDATE students SET face_encoding = %s WHERE id= %s"
        # vals = (serializedEncodings, studentID)

        # Perform and validate the SQL update command
        try:
            cursor.execute(sqlStmt, vals)
        except Exception as e:
            if str(e) == "1300: Invalid utf8mb4 character string: '800363'":
                # Ignore this error
                []
            else:
                raise Exception(
                    "Failed to execute the attendance insertion due to ", e)

        connection.commit()

        # Validate the affected rows count
        result = cursor.rowcount
        if result == 1:
            print("Success")
        else:
            raise Exception("Rows affected should be 1, but got: ", result)

    except Exception as e:
        print(e)

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

            imgCapture = capture()
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
        exit()


main()
