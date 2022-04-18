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


# Take the argument from the command line
studentID = sys.argv[1]

# Validate the input argument
try:
    int(studentID)
except Exception as e:
    print("Invalid studentID: ", studentID, ", due to: ", e)
    exit()


# Connect to database
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

    # Get photo path from database
    cursor.execute("SELECT photo FROM students WHERE id=" + studentID)
    result = cursor.fetchall()
    # print("Fetched: ", result)
    path = str(result[0][0])
    fullPath = "../storage/app/" + path
    # print("full path", fullPath)

    # Open image
    image = face_recognition.load_image_file(fullPath)

    # Vaildate a human face
    face_locations = face_recognition.face_locations(image, model="hog")
    if len(face_locations) < 1:
        # print("Invalid photo, no face detected")
        raise Exception("Invalid photo, no face detected")
    elif len(face_locations) > 1:
        raise Exception("Invalid photo, multiple faces detected")

    # Store encodings in database
    # Align the image first
    # top, right, bottom, left = face_locations(0)
    # desiredWidth = (right-left)
    # desiredHeight = (bottom-top)
    # face_landmarks = face_recognition.face_landmarks(image)
    # align_f = alignFace(image, face_locations, face_landmarks, desiredWidth, desiredHeight)
    face_encodings = face_recognition.face_encodings(image, num_jitters=10)[0]

    serializedEncodings = pickle.dumps(face_encodings)

    sqlStmt = "UPDATE students SET face_encoding = %s WHERE id= %s"
    vals = (serializedEncodings, studentID)

    # Perform and validate the SQL update command
    try:
        cursor.execute(sqlStmt, vals)
    except Exception as e:
        if str(e) == "1300: Invalid utf8mb4 character string: '800363'":
            # Ignore this error
            []
        else:
            raise Exception("Failed to execute the face encodings insertion due to ", e)
            # exit()

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

