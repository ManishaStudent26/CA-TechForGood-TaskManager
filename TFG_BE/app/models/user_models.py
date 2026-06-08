from config.db import get_db_connection

class User:
    def __init__(self, uid, email, password_hash, name, role, phonenr):
        self.uid = uid
        self.email = email
        self._password_hash = password_hash
        self.name = name
        self.role = role
        self.phonenr = phonenr

    def to_dict(self):
        return{
            "uid":self.uid,
            "email":self.email,
            "password_hash":self._password_hash,
            "name":self.name,
            "role": self.role,
            "phonenr": self.phonenr
        }

    @classmethod
    def getUserbyEmail(cls, email):
        connection= get_db_connection()
        cursor=connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM USERS WHERE email=%s", (email,))
            row =cursor.fetchone()
            if row:
                return cls(row['uid'], row['email'], row['password_hash'], row['name'], row['role'], row['phonenumber'])
            return None
        finally:
            cursor.close()
            connection.close()
    
    @classmethod
    def EditUser(cls,uid, email, name, role, phonenr):
        connection= get_db_connection()
        cursor=connection.cursor()
        try:
            query = """
            UPDATE Users
            SET email=%s, name=%s, role=%s, phonenumber=%s
            WHERE uid=%s"""
            cursor.execute(query, (email, name, role, uid, phonenr))
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
    def createUser(cls, email, password_hash, name, phonenr):
        connection=get_db_connection()
        cursor=connection.cursor()
        try:
            query="""INSERT INTO Users(email, password_hash, name, phonenumber)
            VALUES(%s, %s, %s, %s)"""
            cursor.execute(query,(email, password_hash, name,phonenr))
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
        try:
            cursor.execute("SELECT * FROM USERS WHERE uid=%s", (uid,))
            row =cursor.fetchone()
            if row:
                return cls(row['uid'], row['email'], row['password_hash'], row['name'], row['role'], row['phonenumber'])
            return None
        finally:
            cursor.close()
            connection.close()
    @classmethod
    def getAllUser(cls,uid):
        connection=get_db_connection()
        cursor=connection.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM USERS")
            rows= cursor.fetchall()

            users=[]
            for row in rows:
                users.append(cls(
                    uid=row['uid'],
                    email=row['email'],
                    name=row['name'],
                    password_hash=['password_hash'],
                    role=['role'],
                    phonenr=['phonenumber']
                ))
            return users
        finally:
            cursor.close()
            connection.close()