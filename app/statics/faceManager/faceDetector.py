import cv2
import numpy as np
import os

def detectFace(imgPath):
        #workingDir = os.getcwd()
        #imgPath = workingDir+"../uploads/registration/"+"img"+str(user_id)+".jpg"
        faceDetect = cv2.CascadeClassifier("haarcascade_frontalface_default.xml");
        image = cv2.imread(imgPath)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Detect faces in the image
        faces = faceDetect.detectMultiScale(
                gray,
                scaleFactor=1.05,
                minNeighbors=5,
                minSize=(100, 100)
        )

        print("{0} face in the image".format(len(faces)))

        if (len(faces)==0):
                print("no faces found")
                return False
        else:
                # Draw a rectangle 
                for (x, y, w, h) in faces:
                        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

                size = image.shape
                height = size[0]
                if (height > 500):
                        factor = 500.0/height
                        image = cv2.resize(image, None, fx=factor, fy=factor)
                print(image.shape)
                cv2.imshow("Faces found", image)
                cv2.waitKey(0)
                return faces
a = """workingDir = os.getcwd()
print(workingDir)
os.chdir('..')
print(os.getcwd())
workingDir = os.getcwd()
path = os.path.join(workingDir, 'uploads','registration', 'img3.jpg')
print(path)
workingDir = os.getcwd()
detectFace(path)"""
