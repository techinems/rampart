INSERT INTO users (id, first_name, last_name, password, dob, email, phone, admin, active, access_revoked, created_by)
    VALUES (0, 'Yuze', 'Ma', '123456',date '1998-08-26', 'may7@rpi.edu', '5189772963', TRUE, TRUE, FALSE, 0);

INSERT INTO credentials (id, name, abbr, major_cred, parent_cred, created_by)
    VALUES (0, 'Credential_Basic', 'Cred_Basic', TRUE, 0, 0);



