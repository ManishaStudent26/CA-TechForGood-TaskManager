import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv

load_dotenv()

db_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="taskmanager_pool",
    pool_size= 10,
    host=os.getenv('DB_HOST'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASS'),
    database=os.getenv('DB_NAME'))

def get_db_connection():
    return db_pool.get_connection()