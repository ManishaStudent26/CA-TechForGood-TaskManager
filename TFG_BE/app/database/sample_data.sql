INSERT INTO Users (uid, email, password_hash, name, phonenumber, role) VALUES
(1, 'admin.sarah@email.com', 'scrypt:32768:8:1$uH9x1a...', 'Sarah Jenkins', '0871112222', 'Admin'),
(2, 'manager.alex@email.com', 'scrypt:32768:8:1$uH9x1a...', 'Alex Rivera', '0873334444', 'Event Manager'),
(3, 'volunteer.dan@email.com', 'scrypt:32768:8:1$uH9x1a...', 'Dan Robinson', '0875556666', 'Volunteer');


INSERT INTO Availability (uid, timelog_year, week_number, available_hours) 
VALUES (3, 2026, 22, 10.00);
INSERT INTO Availability (uid, timelog_year, week_number, available_hours) 
VALUES (3, 2026, 22, 14.50)
ON DUPLICATE KEY UPDATE available_hours = VALUES(available_hours);

INSERT INTO Availability (uid, timelog_year, week_number, available_hours) 
VALUES (3, 2026, 23, 12.00);

INSERT INTO Projects (project_id, project_owner, project_name, project_start, project_end) VALUES
(101, 2, 'Community Garden Setup', '2026-06-01', '2026-08-30'),
(102, 2, 'Food Drive Logistics', '2026-07-15', NULL);

INSERT INTO ProjectUsers (contributor_id, project_id, uid) VALUES
(501, 101, 3),
(502, 102, 3);

INSERT INTO Tasks (task_name, contributor_id, project_id, task_priority, weight, progress, task_status) VALUES
('Clear topsoil patches', 501, 101, 'HIGH', 2.50, 0.00, 'Planned'),
('Build timber planter boxes', 501, 101, 'MED', 4.00, 50.00, 'Ongoing');