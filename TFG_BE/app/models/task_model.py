from config.db import get_db_connection
from datetime import date
class Task:
    def __init__(self, taskid, taskname, taskowner, projectname, startdate, targetdate, taskpri, weight, progress, status, overdue):
     self.taskid=taskid
     self.taskname=taskname
     self.taskowner=taskowner
     self.projectname=projectname
     self.startdate=startdate
     self.targetdate=targetdate
     self.taskpri=taskpri
     self.weight=weight
     self.progress=progress
     self.status=status
     self.overdue=overdue

    @property
    def overdue(self):
        today = date.today()
        if self.status==('Completed'):
          return  False
        elif today >= self.targetdate:
          return True
        else:
          return False
    
       
    @classmethod
    def getTaskbyProject(cls, pid):
      connection= get_db_connection()
      cursor=connection.cursor(dictionary=True)
      try:
          query = """
            SELECT a.task_id,
            a.task_name,
            b.contributor_id as taskowner,
            c.project_name,
            a.start_date,
            a.target_date,
            a.task_priority
            a.weight
            a.progress
            FROM Tasks a
            LEFT JOIN ProjectUsers b on a.contributor_id=b.contributor_id
            LEFT JOIN Projects c on a.project_id=c.project_id
            WHERE a.project_id= %s
            """
          cursor.excutue(query,(pid,))
          rows =cursor.fetchall()
          tasks=[]
          for row in rows:
            tasks.append((
            taskid=row['task_id'],
            taskname=row['task_name'],
            taskowner=row['taskowner'],
            startdate=row['start_date'],
            targetdate=row['target_date'],
            taskpri=row['task_priority'],
            weight=row['weight'],
            progress=row['progress'],
            status=row['status'],
            overdue=None
            ))
            return tasks

def createTask

def getTaskbyContributor

def setTask

def delTask"""

