CREATE TABLE "users"
(
 "id"             serial NOT NULL,
 "first_name"     text NOT NULL,
 "last_name"      text NOT NULL,
 "nine_hundred"   int NULL,
 "password"      text NOT NULL,
 "dob"            date NOT NULL,
 "email"          text NOT NULL,
 "home_street"    text NULL,
 "home_city"      text NULL,
 "home_state"     text NULL,
 "home_zip"       text NULL,
 "local_street"   text NULL,
 "local_city"     text NULL,
 "local_state"    text NULL,
 "local_zip"      text NULL,
 "phone"          text NOT NULL,
 "rcs_id"         text NULL,
 "rin"            int NULL,
 "admin"          boolean NOT NULL,
 "last_login"     timestamp NULL,
 "active"         boolean NOT NULL,
 "access_revoked" boolean NOT NULL,
 "g_id"           text NULL,
 "slack_id"       text NULL,
 "created_by"     int NOT NULL,
 "created"        timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"     int NULL,
 "updated"        timestamp NULL,
 CONSTRAINT "Ind_573id" UNIQUE ( "id" ),
 CONSTRAINT "Ind_573email" UNIQUE ( "email" ),
 CONSTRAINT "FK_383" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_387" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_users" ON "users"
(
 "id"
);

CREATE INDEX "fkIdx_383" ON "users"
(
 "created_by"
);

CREATE INDEX "fkIdx_387" ON "users"
(
 "updated_by"
);

CREATE TRIGGER "users_autoset_timestamp_cols" BEFORE UPDATE
ON "users" FOR EACH ROW EXECUTE PROCEDURE
autoset_timestamp_cols();