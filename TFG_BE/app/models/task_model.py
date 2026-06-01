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
    def to_dict(self):
        return {
            "taskid": self.taskid,
            "taskname": self.taskname,
            "taskowner": self.taskowner,
            "projectname": self.projectname,
            # Keeps the API safe from JSON serialization errors by converting to string
            "startdate": str(self.startdate) if self.startdate else None,
            "targetdate": str(self.targetdate) if self.targetdate else None,
            "taskpri": self.taskpri,
            "weight": float(self.weight) if self.weight else 0.0, # DECIMAL converts best to float for JSON
            "progress": float(self.progress) if self.progress else 0.0,
            "status": self.status,
            "overdue": self.overdue
        }
    
       
    @classmethod
    def getTaskbyProject(cls, pid):
      connection= get_db_connection()
      cursor=connection.cursor(dictionary=True)
      try:
          query = """
            SELECT a.task_id,
            a.task_name,
            a.contributor_id as taskowner,
            c.project_name,
            a.start_date,
            a.target_date,
            a.task_priority
            a.weight
            a.progress
            FROM Tasks a
            LEFT JOIN Projects c on a.project_id=c.project_id
            WHERE a.project_id= %s
            """
          cursor.excutue(query,(pid,))
          rows =cursor.fetchall()

          tasks=[]
          for row in rows:
            tasks.append(cls(
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
      finally:
          cursor.close()
          connection.close()

    @classmethod
    def createTask(cls, taskname, taskowner, pid, startdate, targetdate, taskpri, weight, progress, status):
        connection =get_db_connection()
        cursor=connection.cursor()
        try:
          query = """
          INSERT INTO Tasks(task_name, contributor_id, project_id, start_date, target_date, task_priority, weight, progress, status)
          VALUE(%s, %s, %s, %s, %s, %s, %s, %s, %s)"""
          cursor.execute(query,(taskname, taskowner, pid, startdate, targetdate, taskpri, weight, progress, status))
          connection.commit()

          new_id = cursor.lastrowid
          name_query = "SELECT project_name FROM Projects WHERE project_id = %s"
          cursor.execute(name_query, (pid,))
          project_row = cursor.fetchone()
          actualprojectname=project_row['project_name']

          return cls(
             taskid=new_id,
             taskname=taskname,
             taskowner=taskowner,
             projectname=actualprojectname,
             startdate=startdate,
             targetdate=targetdate,
             taskpri=taskpri,
             weight=weight,
             progress=progress,
             status=status,
             overdue=None
          )
        finally:
          cursor.close()
          connection.close()

    @classmethod
    def getTaskbyContributor(cls, taskowner):
      connection=get_db_connection()
      cursor=connection.cursor()
      try:
        query="""SELECT a.task_id,
            a.task_name,
            a.contributor_id as taskowner,
            c.project_name,
            a.start_date,
            a.target_date,
            a.task_priority
            a.weight
            a.progress
            FROM Tasks a
            LEFT JOIN Projects c on a.project_id=c.project_id
            WHERE contributor_id=%s"""
        cursor.excute(query,(taskowner,))
        rows =cursor.fetchall()

        tasks=[]
        for row in rows:
            tasks.append(cls(
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
      finally:
        cursor.close()
        connection.close()
    
    @classmethod
    def editTask(cls, taskname, taskowner,startdate, targetdate, taskpri, weight, progress, status):
      connection = get_db_connection()
      cursor = connection.cursor()


    @classmethod
    def delTask(cls, taskid)
      connection = get_db_connection()
      cursor = connection.cursor()
      try:
        query = "DELETE FROM Tasks WHERE task_id = %s"
        cursor.execute(query, (taskid,))
        connection.commit()          
        return cursor.rowcount > 0
      finally:
        cursor.close()
        connection.close()
