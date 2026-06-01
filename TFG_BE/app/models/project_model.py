from config.db import get_db_connection
from datetime import date

class Project:
    def __init__(self, pid, project_owner, project_name, project_start, project_end, project_status, opentasks):
        self.pid = pid
        self.project_owner = project_owner
        self.project_name = project_name
        self.project_start = project_start
        self.project_end = project_end
        self.project_status= project_status
        self.opentasks= opentasks
    
    @property
    def status(self):
        today = date.today()
        if today < self.project_start:
            return "Upcoming"
        elif self.start_date <= today <= self.project_end:
            return "In Progress"
        else:
            return "Completed"

    def to_dict(self):
        return {
            "pid": self.pid,
            "project_owner": self.project_owner,
            "project_name": self.project_name,
            "project_start": self.project_start.isoformat() if self.project_start else None,
            "project_end": self.project_end.isoformat() if self.project_end else None,
            "project_status": self.project_status, # Evaluatethe property dynamically
            "opentasks": self.opentasks
            }

    @classmethod
    def getProjectbyManager(cls,user_uid):
        connection= get_db_connection()
        cursor=connection.cursor(dictionary=True)
        try:
            query = """
            SELECT 
                p.project_id, 
                p.project_owner, 
                p.project_name, 
                p.project_start, 
                p.project_end, 
                COUNT(t.Task_ID) AS opentasks 
                FROM Projects p 
                LEFT JOIN Tasks t ON p.project_id = t.project_id AND t.task_status != 'Completed'
                WHERE p.project_owner = %s 
                GROUP BY p.project_id
                """
            cursor.execute(query, (user_uid,))
            rows = cursor.fetchall()
            
            projects = [] 
            for row in rows:
                projects.append(cls(
                pid=row['project_id'],
                project_owner=row['project_owner'],
                project_name=row['project_name'],
                project_start=row['project_start'],
                project_end=row['project_end'],
                project_status= None,
                opentasks=row['opentasks']
                ))
                return projects
        finally:
            cursor.close()
            connection.close()
@classmethod
def createProject(cls, project_owner, project_name, project_start, project_end):
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            query = """
            INSERT INTO Projects (project_owner, project_name, project_start, project_end)
            VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (project_owner, project_name, project_start, project_end))
            connection.commit()
            
            new_id = cursor.lastrowid
            return cls(
                pid=new_id,
                project_owner=project_owner,
                project_name=project_name,
                project_start=project_start,
                project_end=project_end,
                project_status=None,
                opentasks=0
            )
        finally:
            cursor.close()
            connection.close()

@classmethod
def editProject(cls, pid, project_name, project_start, project_end):
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            query = """
            UPDATE Projects 
            SET project_name = %s, project_start = %s, project_end = %s 
            WHERE project_id = %s
            """
            cursor.execute(query, (project_name, project_start, project_end, pid))
            connection.commit()
            return cursor.rowcount > 0 
        finally:
            cursor.close()
            connection.close()

@classmethod
def deleteProject(cls, pid):
        connection = get_db_connection()
        cursor = connection.cursor()
        try:
            query = "DELETE FROM Projects WHERE project_id = %s"
            cursor.execute(query, (pid,))
            connection.commit()          
            return cursor.rowcount > 0
        finally:
            cursor.close()
            connection.close()