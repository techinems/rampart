CREATE TABLE "users_credentials"
(
 "user_id"       int NOT NULL,
 "credential_id" int NOT NULL,
 "date_promoted" date NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_585" UNIQUE ( "credential_id" ),
 CONSTRAINT "FK_453" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_457" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_86" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_91" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersCredentials" ON "users_credentials"
(
 "credential_id",
 "user_id"
);

CREATE INDEX "fkIdx_453" ON "users_credentials"
(
 "created_by"
);

CREATE INDEX "fkIdx_457" ON "users_credentials"
(
 "updated_by"
);

CREATE INDEX "fkIdx_86" ON "users_credentials"
(
 "credential_id"
);

CREATE INDEX "fkIdx_91" ON "users_credentials"
(
 "user_id"
);

CREATE TRIGGER "users_credentials_autoset_update_col" BEFORE UPDATE
ON "users_credentials" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
