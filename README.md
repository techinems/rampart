# Rampart

A NodeJs backend for RPI Ambulance.



## Getting started

### Step 1 : Make sure you have docker and docker-compose installed
[Docker](www.docker.com)

### Step 2 : Copy the env file and set it up

```bash
$ cp .env.example .env
```

### Step 3 : Start the backend

```
$ ./scripts/init.sh
```

### Step 4 : Run the migration sql via any sort of DB management tool you could use

```sql
INSERT INTO users (id, first_name, last_name, password, dob, email, phone, admin, active, access_revoked, created_by)
    VALUES (0, 'RPI', 'Ambulance', 'e10adc3949ba59abbe56e057f20f883e',date '1970-01-01', 'admin@rpi.edu', '5189772963', TRUE, TRUE, FALSE, 0);

INSERT INTO credentials (id, name, abbr, major_cred, parent_cred, created_by)
    VALUES (0, 'Observer', 'OB', TRUE, 0, 0);

INSERT INTO permissions (name, active, description, created_by)
VALUES ('approve', TRUE, 'approve', 0);
INSERT INTO permissions (name, active, description, created_by)
VALUES ('vote', TRUE,'vote', 0);

-- Test User_Permissions
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 1, TRUE, 0);
INSERT INTO users_permissions (user_id, permission_id, active, created_by)
VALUES (0, 2, TRUE, 0);


```


## Developmen Referen
[Sequalize](https://sequelize.org/v5/manual/models-usage.html)