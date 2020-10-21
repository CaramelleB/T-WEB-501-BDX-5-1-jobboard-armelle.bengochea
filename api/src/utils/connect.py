from src.utils.env import *
import pymysql


# MySQL configurations
def connection():
    return pymysql.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        db=MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )
