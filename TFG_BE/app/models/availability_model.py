from config.db import get_db_connection

class Availability:
    def __init__(self,timeid, uid,year,week,hours):
        self.timeid=timeid
        self.uid=uid
        self.year=year
        self.week=week
        self.hours=hours

    def to_dict(self):
        return{
            "timeid":self.timeid,
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
            'timeid':row['timelog_id'],
            'uid':row['uid'],
            'year':row['timelog_year'],
            'week':row['week_number'],
            'hours':row['available_hours']})
            return availabilities
        finally:
            cursor.close()
            connection.close()

    @classmethod
    def setAvailability(cls,uid, week, year, hours):
        connection=get_db_connection()
        cursor=connection.cursor()
        try:
            query="""INSERT INTO Availability (uid, week_number, timelog_year, available_hours)
            VALUES (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE available_hours = VALUES(available_hours)"""
            cursor.execute(query, (uid, week, year,hours))
            connection.commit()
            return cursor.rowcount > 0
        finally:
            cursor.close()
            connection.close()

    
    @classmethod
    def updateAvailability(cls,uid,week, year, hours):
        connection=get_db_connection()
        cursor=connection.cursor()
        try:
            query="""UPDATE Availability
            SET hours=%s
            WHERE uid=%s
            AND week_number=%s
            AND timelog_year=%s"""
            cursor.execute(query,(hours, uid, week, year))
            connection.commit()
            return cursor.rowcount > 0
        finally:
            cursor.close()
            connection.close()