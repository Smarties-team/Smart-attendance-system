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

print("Student ID:", studentID)

# Access database
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


connection = msql.connect(**connection_config_dict)

if connection.is_connected():
    db_Info = connection.get_server_info()
    print("Connected to MySQL Server version ", db_Info)


cursor = connection.cursor()


# Get photo path from database
cursor.execute("SELECT photo FROM students WHERE id=" + studentID)
result = cursor.fetchall()
print("Fetched: ", result)
path = str(result[0][0])
fullPath = "../storage/app/" + path
print("full path", fullPath)

cursor.close()
connection.close()


# Open image
image = face_recognition.load_image_file(fullPath)

# Vaildate a human face
face_locations = face_recognition.face_locations(image, model="cnn")

if len(face_locations) < 1:
    print("Invalid photo, no face detected")
    exit
elif len(face_locations) > 1:
    print("Invalid photo, multiple faces detected")
    exit


# Store encodings in database
# Align the image first
# top, right, bottom, left = face_locations(0)
# desiredWidth = (right-left)
# desiredHeight = (bottom-top)
# face_landmarks = face_recognition.face_landmarks(image)
# align_f = alignFace(image, face_locations, face_landmarks, desiredWidth, desiredHeight)
face_encodings = face_recognition.face_encodings(image, num_jitters=10)[0]

serializedEncodings = pickle.dumps(face_encodings)

connection = msql.connect(**connection_config_dict)

if connection.is_connected():
    db_Info = connection.get_server_info()
    print("Connected to MySQL Server version ", db_Info)


cursor = connection.cursor()


sqlStmt = "UPDATE students SET face_encoding = %s WHERE id= %s"

f = open("myfile", "rb")
vals = (serializedEncodings, studentID)

try:
    cursor.execute(sqlStmt, vals)
except Exception as e:
    print("excep")
    print(e)


connection.commit()
result = cursor.rowcount
print("Rows affected: ", result)


cursor.close()
connection.close()

