from config.db import get_db_connection

class Contributor:
    def __init__(self, cid, pid, uid, name):
        self.cid=cid
        self.pid=uid
        self.name=name

@classmethod
def getContributorbyProject():

@classmethod
def addContributortoProject():

@classmethod
def removeContributorfromProject():