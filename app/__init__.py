from flask import Flask, request, render_template, url_for, redirect, session, logging, flash
from passlib.hash import sha256_crypt
import statics.userManager.userManager as userManager
import statics.dbConnector.dbConnector as dbConn
import statics.faceManager.faceDetector as faceDetector
import time


import cv2
import numpy as np
import os
import time

#app.config['MYSQL_DATABASE_USER'] = 'root'
#app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
#app.config['MYSQL_DATABASE_DB'] = 'EmpData'
#app.config['MYSQL_DATABASE_HOST'] = 'localhost'
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = 'statics/uploads/registration'


app = Flask(__name__)
app.secret_key = 'many random bytes'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['APP_ROOT'] = APP_ROOT



@app.route("/")
def index():
    return render_template("home.html")

#signup page
@app.route("/signup" ,methods=["POST", "GET"])
def signup():
    message = ""
    form = userManager.signupForm(request.form)
    signupMgr = userManager.signupManager(dbConn)

    if (request.method == "POST" and form.validate()):
        name = form.name.data
        email = form.email.data
        password = sha256_crypt.hash(str(form.password.data))
        userExists = signupMgr.userExists(email)

        if(userExists):
            message = "there is an exisitng account for the email"
            return render_template('signup.html', form=form, message=message)
        else:
            signupMgr.register(name, email, password)
            message = "email confirmation sent please login to your account"
            return redirect(url_for("login"))



    return render_template('signup.html', form=form)


#login page
@app.route("/login", methods=["GET","POST"])
def login():
    loginMgr = userManager.loginManager(dbConn)
    message = ""
    if (request.method == "POST"):
        session.pop('logged_in',None)
        username = request.form['username']
        password = request.form['password']

        if (loginMgr.logUser(username, password)):
            loginMgr.setSession(username)
            return redirect(url_for("dashboard"))
        else:
            message = "wrong password"
            return render_template('login.html', message=message)

    return render_template('login.html', message=message)

#dashboard
@app.route("/dashboard",methods=["GET","POST"])
def dashboard():
    if (session['logged_in'] is not None):
        if (session["imgPath"] is None):
            return redirect(url_for("uploadImage"))
        else:
            return render_template('dashboard.html')
    else:
        return render_template('login.html',)

#image upload in registraion
@app.route("/uploadImage", methods = ["GET","POST"])
def uploadImage():
        signupMgr = userManager.signupManager(dbConn)
        if(session["logged_in"] == True):
            if (request.method == "POST"):
                if 'file' not in request.files:
                    flash('No file part')
                    return redirect(request.url)
                img = request.files['file']
                if img.filename == '':
                   flash('No selected file')
                   return redirect(request.url)
                if img:
                    filename = "img"+str(session["user_id"]) + ".jpg"
                    img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    signupMgr.setImageDir(session["user_id"])

                    path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
                    #faceDetector.detectFace("img3.jpg")

                    return redirect(url_for("dashboard"))
            return render_template('uploadImage.html')
        else:
            return redirect(url_for("login"))

#logout
@app.route("/logout")
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    session.pop('name', None)
    session.pop('email', None)
    session.pop('imgPath', None)
    session.pop('faceVector', None)
    return redirect(url_for("login"))
if (__name__ == "__main__"):
    app.run()

dbConn.close()


