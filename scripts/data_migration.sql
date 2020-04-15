INSERT INTO users (id, first_name, last_name, password, dob, email, phone, admin, active, access_revoked, created_by)
    VALUES (0, 'RPI', 'Ambulance', 'e10adc3949ba59abbe56e057f20f883e',date '1970-01-01', 'admin@rpi.edu', '5189772963', TRUE, TRUE, FALSE, 0);

-- INSERT INTO credentials (id, name, abbr, major_cred, parent_cred, created_by)
--     VALUES (0, 'Observer', 'O', TRUE, 0, 0);

INSERT INTO permissions (name, active, description, created_by) VALUES ('approve', TRUE, 'approve', 0);
INSERT INTO permissions (name, active, description, created_by) VALUES ('vote', TRUE,'vote', 0);
INSERT INTO permissions (name, active, description, created_by) VALUES ('member_management', TRUE,'member_management', 0);
INSERT INTO permissions (name, active, description, created_by) VALUES ('credential_management', TRUE,'credential_management', 0);
INSERT INTO permissions (name, active, description, created_by) VALUES ('training_progress_management', TRUE,'training_progress_management', 0);
INSERT INTO permissions (name, active, description, created_by) VALUES ('promotion_management', TRUE,'promotion_management', 0);

-- Admin User_Permissions
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 1, TRUE, 0);
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 2, TRUE, 0);
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 3, TRUE, 0);
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 4, TRUE, 0);
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 5, TRUE, 0);
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 6, TRUE, 0);