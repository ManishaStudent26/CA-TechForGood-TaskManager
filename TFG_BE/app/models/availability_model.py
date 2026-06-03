from config.db import get_db_connection

class Availability:
    def __init__(self,uid,year,week,hours):
        self.uid=uid
        self.year=year
        self.week=week
        self.hours=hours

    def to_dict(self):
        return{
            "uid":self.uid,
            "year":self.year,
            "week":self.week,
            "hours":self.hours}
        


@classmethod    
def getAvailability(cls,uid):
    connection=get_db_connection()
    cursor=connection.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM Availability WHERE uid=%s", (uid,))
        rows=cursor.fetchall()
        availabilities = []
        for row in rows: availabilities.append({
            'uid':row['uid'],
            'year':row['year'],
            'week':row['week'],
            'hours':row['hours']})
        return availabilities
    finally:
        cursor.close()
        connection.close()

@classmethod
def setAvailability(cls,uid, week, year, hours):
    connection=get_db_connection()
    cursor=connection.cursor
    try:
        query="""INSERT INTO Availability (uid, week, year, hours),
        VALUES (%s, %s, %s, %s)"""
        cursor.execute(query, (uid, week, year,hours))
        connection.commit()
    finally:
        cursor.close()
        connection.close()

@classmethod
def updateAvailability(cls,uid,week, year, hours):
    connection=get_db_connection()
    cursor=connection.cursor
    try:
        query="""UPDATE Availability
        SET hours=%s
        WHERE uid=%s
        AND week=%s
        AND year=%s"""
        cursor.execute(query,(hours, uid, week, year))
        connection.commit()
    finally:
        cursor.close()
        connection.close()