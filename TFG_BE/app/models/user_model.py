from config.database import get_db_connection
from werkzeug.security import check_password_hash

class User:
    def __init__(self, uid, email, password_hash, name, role):
        self.uid = uid
        self.email = email
        self._password_hash = password_hash
        self.name = name
        self.role = role

        @classmethod
        def getUserbyEmail(cls, email):
            connection=connection.cursor(dictionary=True)
            cursor=execute("SELECT FROM USERS WHERE email=%s", (email,))
        if row:
            return cls(row['uid'], row['email'], row['password_hash'], row['name'], row['role'])
        return None

        """def getUserByID(cls):
        
        def createUser(cls):"""
    

        