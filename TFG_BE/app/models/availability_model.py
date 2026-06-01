from config.database import get_db_connection

class Availability:
    def __init__(self,uid,week,hours):
        self.uid=uid
        self.week=week
        self.hours=hours

@classmethod    
def getAvailability(uid):
    connection=get_db_connection
    cursor=connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Availability WHERE email=%s", (uid,))
    rows =cursor.fetchall()
    for row in rows:
        return cls(row['uid'], row['ema'], row['password_hash'], row['name'], row['role'])
    return None