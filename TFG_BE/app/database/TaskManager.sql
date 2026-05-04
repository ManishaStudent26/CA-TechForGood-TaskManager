/*Database creation*/
CREATE DATABASE IF NOT EXISTS TaskManager_DB
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE TaskManager_DB;

CREATE TABLE IF NOT EXISTS Users(
uid INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(100) NOT NULL UNIQUE,
password_hash(255) NOT NULL,
name VARCHAR(100) NOT NULL,
phonenumber VARCHAR(20) NOT NULL,
role ENUM('Volunteer', 'Admin', 'Event Manager') DEFAULT 'Volunteer',
INDEX idx_email (email)
)

CREATE TABLE IF NOT EXISTS Availability(
    timelog_id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT FOREIGN KEY NOT NULL,
    timelog_year YEAR NOT NULL
    week_number TINYINT NOT NULL,
    available_hours DECIMAL(4,2)
)

CREATE TABLE IF NOT EXISTS Projects(
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT FOREIGN KEY NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    project_start DATE NO NULL,
    project_end DATE
)

CREATE TABLE IF NOT EXISTS Tasks(
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_nameVARCHAR(255) NOT NULL,
    owner_id FOREIGN KEY DEFAULT NULL,
    project_id INT FOREIGN KEY NOT NULL,
    start_date DATE DEFAULT NULL,
    target_date DATE DEFAULT NULL,
    task_priority ENUM('LOW', 'MED', 'HIGH'),
    weight DECIMAL(4,2),
    progress DECIMAL(5,2),
    task_status ENUM('Planned', 'Ongoing', 'Completed'))

CREATE TABLE IF NOT EXISTS ProjectUsers(
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id FOREIGN KEY NOT NULL,
    uid FOREIGN KEY NOT NULL
)