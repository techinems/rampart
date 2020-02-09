FROM library/postgres

# Copy migration files
COPY ./schema/ /home/schema
COPY ./all.sql /home

# Execute migrations files
COPY ./scripts/db_migration.sh /docker-entrypoint-initdb.d/

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres_pass
ENV POSTGRES_DB rampart
