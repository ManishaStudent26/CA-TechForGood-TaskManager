/*Data base creation- 
Udate 23/05/26
Fix 1: Foreign key at end of table definition instead of middle due to error.
Fix found based on gemini input but manually editted.
Fix 2: adjust minor structural details to fix logic of data structure.
*/
CREATE DATABASE IF NOT EXISTS TaskManager_DB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE TaskManager_DB;

CREATE TABLE IF NOT EXISTS Users(
uid INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
name VARCHAR(100) NOT NULL,
phonenumber VARCHAR(20) NOT NULL,
role ENUM('Volunteer', 'Admin', 'Event Manager') DEFAULT 'Volunteer',
INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS Availability(
    timelog_id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    timelog_year YEAR NOT NULL,
    week_number TINYINT NOT NULL,
    available_hours DECIMAL(4,2),
    FOREIGN KEY(uid) REFERENCES Users(uid)
    CONSTRAINT unique_user_week UNIQUE (uid, timelog_year, week_number)
);

CREATE TABLE IF NOT EXISTS Projects(
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_owner INT NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    project_start DATE NOT NULL,
    project_end DATE,
    FOREIGN KEY(project_owner) REFERENCES Users(uid)
);
CREATE TABLE IF NOT EXISTS ProjectUsers(
    contributor_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    uid INT NOT NULL,
    FOREIGN KEY(project_id) REFERENCES Projects(project_id),
    FOREIGN KEY(uid) REFERENCES Users(UID)
);


CREATE TABLE IF NOT EXISTS Tasks(
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR (255) NOT NULL,
    contributor_id INT DEFAULT NULL,
    project_id INT NOT NULL,
    start_date DATE DEFAULT NULL,
    target_date DATE DEFAULT NULL,
    task_priority ENUM('LOW', 'MED', 'HIGH'),
    weight DECIMAL(4,2),
    progress DECIMAL(5,2),
    task_status ENUM('Planned', 'Ongoing', 'Completed'),
    FOREIGN KEY(contributor_id) REFERENCES ProjectUsers(contributor_id),
    FOREIGN KEY(project_id) REFERENCES Projects(project_id));