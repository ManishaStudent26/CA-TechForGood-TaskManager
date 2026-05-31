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
    def getTaskbyProject:


def createTask

def getTaskbyContributor

def setTask

def delTask"""

