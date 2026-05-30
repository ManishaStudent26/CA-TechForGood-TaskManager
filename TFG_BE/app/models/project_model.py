from config.database import get_db_connection
class Project:
   def __init__(self, pid, project_owner, project_name, project_start, project_end):
        self.pid = pid
        self.project_owner = project_owner
        self.project_name = project_name
        self.project_start = project_name
        self.project_start = project_start
        self.project_end = project_end


@classmethod
def getProjectbyManager(cls,user_uid):
    connection= get_db_connection()
    cursor=connection.cursor(dictionary=True)
    try:
        query = "SELECT * FROM Projects WHERE project_owner = %s"
        cursor.execute(query, (user_uid,))
        rows = cursor.fetchall()
        projects = []
        for row in rows:
            projects.append(cls(
                uid=row['project_id'], # The Project's own unique ID variable
                title=row['title'],
                description=row['description'],
                date=row['date'],
                status=row['status']
            ))
        return projects
    finally:
        cursor.close()
        connection.close()

@classmethod
def createProject:

@classmethod
def deleteProject: