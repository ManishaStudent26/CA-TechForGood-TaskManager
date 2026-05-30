from config.database import get_db_connection
class Project:
   def __init__(self, pid, project_owner, project_name, project_start, project_end, project_status):
        self.pid = pid
        self.project_owner = project_owner
        self.project_name = project_name
        self.project_start = project_name
        self.project_start = project_start
        self.project_end = project_end
        self.project_status= project_status
        @property
        def status(self):
            today = date.today()
            if today < self.start_date:
                return "Upcoming"
            elif self.start_date <= today <= self.end_date:
                return "In Progress"
            else:
                return "Completed"


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
                pid=row['project_id'],
                project_name=row['project_name'],
                project_start=row['project_start'],
                project_end=row['project_end'],
            ))
        return projects
    finally:
        cursor.close()
        connection.close()

@classmethod
def createProject:

@classmethod
def deleteProject: