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

Once the terminal shows **Rampart is live on port 3000!** , that means the application has been successfully deployed and is now available at localhost:3000.

## Development Reference
[Sequalize](https://sequelize.org/v5/manual/models-usage.html)