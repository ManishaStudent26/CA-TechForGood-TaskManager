from config.db import get_db_connection

class Contributor:
    def __init__(self, cid, pid, uid, name):
        self.cid=cid
        self.pid=pid
        self.uid=uid
        self.name=name
    def to_dict(self):
        return {
            "contributor_id": self.cid,
            "project_id": self.pid,
            "uid": self.uid,
            "name": self.name
        }

    @classmethod
    def getContributorbyProject(cls,pid):
        connection= get_db_connection()
        cursor=connection.cursor(dictionary=True)
        try:
            query = """
            SELECT 
                p.contributor_id,
                p.project_id,
                p.uid,
                u.name
                FROM ProjectUsers p 
                LEFT JOIN Users u ON p.uid= u.uid
                WHERE project_id=%s
                """
            cursor.execute(query, (pid,))
            rows = cursor.fetchall()
            
            contributors = []
            for row in rows:
                contributors.append(cls(
                cid=row['contributor_id'],
                pid=row['project_id'],
                uid=row['uid'],
                name=row['name'],
                ))
            return contributors
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def addContributortoProject(cls, pid, uid):
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        try:
            role_query = "SELECT name, role FROM Users WHERE uid = %s"
            cursor.execute(role_query, (uid,))
            user_row = cursor.fetchone()
            
            if not user_row:
                raise ValueError("User does not exist.")
                
            if user_row['role'] != 'Volunteer':
                raise ValueError("Only users with the role 'Volunteer' can be added as contributors.")

            duplicate_query = "SELECT contributor_id FROM ProjectUsers WHERE project_id = %s AND uid = %s"
            cursor.execute(duplicate_query, (pid, uid))
            if cursor.fetchone():
                raise ValueError("This user is already a contributor to this project.")

            insert_query = """
            INSERT INTO ProjectUsers (project_id, uid)
            VALUES (%s, %s)
            """
            cursor.execute(insert_query, (pid, uid))
            connection.commit()
            
            return cls(
                cid=cursor.lastrowid,
                pid=pid,
                uid=uid,
                name=user_row['name']
            )
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def removeContributorfromProject(cls, cid):
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            query = """
            DELETE FROM ProjectUsers 
            WHERE contributor_id = %s
            """
            cursor.execute(query, (cid,))
            connection.commit()
            
            return cursor.rowcount > 0
        finally:
            cursor.close()
            connection.close()