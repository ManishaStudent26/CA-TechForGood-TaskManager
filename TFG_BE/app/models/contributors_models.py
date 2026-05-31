from config.db import get_db_connection

class Contributor:
    def __init__(self, cid, pid, uid, name):
        self.cid=cid
        self.pid=pid
        self.uid=uid
        self.name=name

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
                FROM ProjectsUsers p 
                LEFT JOIN Users u ON p.uid= u.uid
                WHERE project_id=%s
                """
            cursor.execute(query, (pid,))
            rows = cursor.fetchall()
            
            projects = []
            for row in rows:
                projects.append(cls(
                pid=row['project_id'],
                uid=row['uid'],
                name=row['name'],
                ))
                return projects
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def addContributortoProject():

    @classmethod
    def removeContributorfromProject():