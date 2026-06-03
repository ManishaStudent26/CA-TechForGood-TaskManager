from config.db import get_db_connection

class User:
    def __init__(self, uid, email, password_hash, name, role):
        self.uid = uid
        self.email = email
        self._password_hash = password_hash
        self.name = name
        self.role = role

    @classmethod
    def getUserbyEmail(cls, email):

        connection= get_db_connection()
        cursor=connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM USERS WHERE email=%s", (email,))
            row =cursor.fetchone()
            if row:
                return cls(row['uid'], row['email'], row['password_hash'], row['name'], row['role'])
            return None
        finally:
            cursor.close()
            connection.close()
    
    @classmethod
    def EditUser(cls,uid, email, name, role):
        connection= get_db_connection()
        cursor=connection.cursor()
        try:
            query = """
            UPDATE Users
            SET email=%s, name=%s, role=%s
            WHERE uid=%s"""
            cursor.execute(query, (email, name, role, uid))
            connection.commit()
            return cursor.rowcount > 0 
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def DelUser(cls,uid):
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            query = "DELETE FROM Users WHERE uid = %s"
            cursor.execute(query, (uid,))
            connection.commit()          
            return cursor.rowcount > 0
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def changePassword(cls,uid, password_hash):
        connection= get_db_connection()
        cursor= connection.cursor()
        try:
            query= """UPDATE Users
            SET password_hash = %s
            WHERE uid=%s
            """
            cursor.execute(query,(password_hash, uid))
            connection.commit()
            return cursor.rowcount > 0
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def createUser(cls, email, password_hash, name):
        connection=get_db_connection()
        cursor=connection.cursor()
        try:
            query="""INSERT INTO Users(email, password_hash, name)
            VALUES(%s, %s, %s)"""
            cursor.execute(query,(email, password_hash, name))
            connection.commit()
            new_id = cursor.lastrowid
            return cls(
                uid=new_id,
                email=email,
                name=name,
                password_hash=password_hash,
                role='Volunteer'
            )
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def getUserbyID(cls,uid):
        connection= get_db_connection()
        cursor=connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM USERS WHERE uid=%s", (uid,))
        row =cursor.fetchone()
        if row:
            return cls(row['uid'], row['email'], row['password_hash'], row['name'], row['role'])
        return None