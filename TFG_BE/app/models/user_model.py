from config.database import get_db_connection
from werkzeug.security import check_password_hash

class User:
    def __init__(self, uid, email, password_hash, name, role):
        self.uid = uid
        self.email = email
        self.password_hash = password_hash
        self.name = name
        self.role = role

        @classmethod
        def getUserbyEmail(cls):

        def getUserByID(cls):
        
        def createUser(cls):
        