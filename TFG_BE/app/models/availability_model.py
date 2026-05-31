from config.database import get_db_connection

class Availability:
    def __init__(self,uid,week,hours):
        self.uid=uid
        self.week=week
        self.hours=hours

@classmethod    
def getAvailability():
