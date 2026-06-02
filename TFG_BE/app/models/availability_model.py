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
        return cls(row['uid'], row['week'], row['hour'])
    return None

@classmethod
def setAvailability(uid, week, hours):
    connection=get_db_connection
    cursor=connection.cursor
    try:
        query="""INSERT INTO Availability (uid, week, hours),
        VALUES (%s, %s, %s)"""
        cursor.execute(query, (uid, week, hours))
        connection.commit()
    finally:
        cursor.close()
        connection.close()

@classmethod
def updateAvailability(uid,week, hours):
    connection=get_db_connection
    cursor=connection.cursor
    try:
        query="""UPDATE Availability
        SET hours=%s
        WHERE uid=%s
        AND week=%s"""
        cursor.execute(query,hours, uid, week)
        connection.commit
    finally:
        cursor.close()
        connection.close()