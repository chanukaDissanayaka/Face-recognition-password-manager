from flask import Flask, request, render_template, url_for, redirect, session, logging
from wtforms import Form, StringField, TextAreaField, PasswordField, FileField, validators
from passlib.hash import sha256_crypt
import statics.dbConnector.dbConnector as dbConn


class signupForm(Form):
     name = StringField('Name', [validators.Length(min = 1, max = 50),validators.DataRequired()])
     email = StringField('Email', [validators.Length(min = 1, max = 50) ,validators.DataRequired()])
     password = PasswordField('Password', [validators.DataRequired(), validators.EqualTo('confirm', message = 'password do not match')])
     confirm = PasswordField('comfirm password')

class signupManager:
    dbConn

    def __init__(self, dbConn):
        self.dbConn = dbConn

    def userExists(self, email):
        cur = dbConn.getCursor()
        c = cur.execute("SELECT * FROM user WHERE email = %s", (email))
        if (int(c)>0):
            return True
        else:
            return False

    def register(self, name, email, password):
        cur = dbConn.getCursor()
        cur.execute("INSERT INTO user(name, email, password) VALUES(%s, %s, %s)", (name, email, password))
        dbConn.commitQuery()
    def setImageDir(self,user_id):
        img = "img" + str(user_id) + ".jpg"
        cur = dbConn.getCursor()
        cur.execute("UPDATE user SET imgPath = %s WHERE user_id = %s", (img, user_id))
        dbConn.commitQuery()

class loginManager:
    class __loginManager:
        dbConn
        def __init__(self, dbConn):
            self.dbConn = dbConn

    instance = None
    def __init__(self, dbConn):
        if not (loginManager.instance):
            loginManager.instance = loginManager.__loginManager(dbConn)
        else :
            loginManager.instance.dbConn = dbConn

    def logUser(self, email, password):
            cur = dbConn.getCursor()
            cur.execute("SELECT * FROM user WHERE email = %s", (email))
            row = cur.fetchone()
            hash = row[3]

            if (sha256_crypt.verify(password, hash)):
                return True
            else:
                return False

    def setSession(self, email):
        cur = dbConn.getCursor()
        cur.execute("SELECT * FROM user WHERE email = %s", (email))
        row = cur.fetchone()

        session["logged_in"] = True
        session["user_id"] = row[0]
        session["name"] = row[1]
        session["email"] = email
        session["imgPath"] = row[4]
        session["faceVector"] = row[5]

class dashboardManager():
    class __dashboardManager:
        dbConn
        def __init__(self, dbConn):
            self.dbConn = dbConn

        instance = None
        def __init__(self, dbConn):
            if not (dashboardManager.instance):
                dashboardManager.instance = dashboardManager.__loginManager(dbConn)
            else :
                dashboardManager.instance.dbConn = dbConn



