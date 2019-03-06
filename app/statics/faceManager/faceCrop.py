import numpy as np
import cv2 as cv

def cropFace(faces):
    for (x,y,w,h) in faces:
        cv.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        r = max(w, h) / 2
        centerx = x + w / 2
        centery = y + h / 2
        nx = int(centerx - r)
        ny = int(centery - r)
        nr = int(r * 2)
        i = i+1
        faceimg = img[ny:ny+nr, nx:nx+nr]
        lastimg = cv.resize(faceimg, (320, 320))
        cv.imwrite("face%d.jpg" % i, lastimg)
        cv.imshow('img',lastimg)
        cv.waitKey(0)
        cv.destroyAllWindows()