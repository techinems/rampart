CREATE TABLE "permission_prerequisite"
(
 "permission_id"       int NOT NULL,
 "credential_id" int NOT NULL,
 "active"        boolean Not NULL
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_1008" UNIQUE ("permission_id", "credential_id" ),
 CONSTRAINT "FK_1009" FOREIGN KEY ( "permission_id" ) REFERENCES "permissions" ( "id" ),
 CONSTRAINT "FK_1010" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_1011" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_1012" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),

);

CREATE UNIQUE INDEX "PK_permission_prerequisit" ON "permission_prerequisite"
(
 "permission_id",
 "credential_id"
);

CREATE INDEX "FK_1009" ON "permission_prerequisite"
(
 "permission_id"
);

CREATE INDEX "FK_1010" ON "permission_prerequisite"
(
 "credential_id"
);

CREATE INDEX "FK_1011" ON "permission_prerequisite"
(
 "updated_by"
);

CREATE INDEX "FK_1012" ON "permission_prerequisite"
(
 "created_by"
);

CREATE TRIGGER "permission_prerequisite_autoset_update_col" BEFORE UPDATE
ON "permission_prerequisite" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
