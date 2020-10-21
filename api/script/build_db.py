import sys
import os
from time import sleep
from src.utils.env import *
import MySQLdb

sql_path = os.path.dirname(os.path.abspath(__file__))
init = os.path.join(sql_path, 'ressource/init.sql')
drop = os.path.join(sql_path, 'ressource/drop.sql')


def create_db(job, file):
    i = 0
    line = len(open(file).readlines())
    sys.stdout.write(job)
    sys.stdout.flush()

    for req in open(file):
        cursor.execute(req)
        msg = f"request {i} of {line}"
        sys.stdout.write(msg + chr(8) * len(msg))
        sys.stdout.flush()
        i += 1

    sys.stdout.write("DONE" + " "*len(msg)+"\n")
    sys.stdout.flush()
    sleep(0.5)


def yes_or_no(question):
    quit = 0
    while quit == 0:
        reply = str(input(question+' (y/n): ')).lower().strip()
        if reply == 'y':
            return True
        if reply == 'n':
            return False
        else:
            return yes_or_no("Uhhhh... please enter ")


def db_exist():
    try:
        MySQLdb.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            passwd=MYSQL_PASSWORD,
            db=MYSQL_DB
        )
        return True
    except Exception:
        return False


if db_exist() is True:
    cursor = MySQLdb.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            passwd=MYSQL_PASSWORD,
            db=MYSQL_DB
        ).cursor()
    if yes_or_no('Database Exists\nDo You Want To Drop It'):
        cursor.execute("DROP DATABASE IF EXISTS jobboard")
        print('Database Droped!')
        create_db('Create Database : ', init)
    else:
        print('Ok I Do Anything')
else:
    cursor = MySQLdb.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            passwd=MYSQL_PASSWORD,
        ).cursor()
    if yes_or_no('Database Does Not Exists!\nDo You Want To Drop It'):
        create_db('Create Database : ', init)
    else:
        print('Ok I Do Anything')
