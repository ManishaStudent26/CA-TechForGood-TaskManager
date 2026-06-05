import mysql.connector
from mysql.connector import Error
from config.settings import Config


db_config = {
    "host": Config.DB_HOST,
    "user": Config.DB_USER,
    "password": Config.DB_PASS,
    "database": Config.DB_NAME,
    "port": Config.DB_PORT
}


db_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="task_manager_pool",
        pool_size=5,
        pool_reset_session=True,
        **db_config
    )

def get_db_connection():
    return db_pool.get_connection()