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
    VALUES (0, 'Yuze', 'Ma', '123456',date '1998-08-26', 'may7@rpi.edu', '5189772963', TRUE, TRUE, FALSE, 0);



```
