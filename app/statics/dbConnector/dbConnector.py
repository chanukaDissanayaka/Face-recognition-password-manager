from flaskext.mysql import MySQL
import pymysql

db = pymysql.connect("localhost","root","","passwordManager" )
cursor = db.cursor()

def getCursor():
    return cursor
def close():
    db.close()
def commitQuery():
    db.commit()