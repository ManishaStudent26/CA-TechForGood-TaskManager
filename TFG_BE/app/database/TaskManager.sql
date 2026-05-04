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
role ENUM('Volunteer', 'Admin', 'Event Manager') DEFAULT 'Volunteer')

CREATE TABLE IF NOT EXISTS Availability(
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    uid INT FOREIGN KEY NULL,
    log_year YEAR NOT NULL
    week_number TINYINT NOT NULL,
    available_hours DECIMAL(4,2)

)

CREATE TABLE IF NOT EXISTS Projects()

CREATE TABLE IF NOT EXISTS Tasks()

CREATE TABLE IF NOT EXISTS ProjectUsers()