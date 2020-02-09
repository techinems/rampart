FROM library/postgres

COPY ./schema/ /home/schema
COPY ./all.sql /home

COPY ./scripts/db_migration.sh /docker-entrypoint-initdb.d/
# RUN chmod +x /usr/local/db_migration.sh

# RUN psql -U postgres -d rampart -a -f /home/all.sql

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres_pass
ENV POSTGRES_DB rampart
