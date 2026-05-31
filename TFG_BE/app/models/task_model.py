from config.db import get_db_connection
from datetime import date
class Task:
    def __init__(self, taskid, taskname, taskowner, pid, startdate, targetdate, taskpri, weight, progress, status, overdue):
     self.taskid=taskid
     self.taskname=taskname
     self.taskowner=taskowner
     self.pid=pid
     self.startdate=startdate
     self.targetdate=targetdate
     self.taskpri=taskpri
     self.weight=weight
     self.progress=progress
     self.status=status
     self.overdue=overdue


"""@classmethod
def getTaskbyProject


def createTask

def getTaskbyContributor

def setTask

def delTask"""

