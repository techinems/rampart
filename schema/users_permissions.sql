CREATE TABLE "users_permissions"
(
 "user_id"       int NOT NULL,
 "permission_id" int NOT NULL,
 "active"        boolean Not NULL
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_1003" UNIQUE ("user_id", "permission_id" ),
 CONSTRAINT "FK_1004" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_1005" FOREIGN KEY ( "permission_id" ) REFERENCES "permissions" ( "id" ),
 CONSTRAINT "FK_1006" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_1007" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_userspermissions" ON "users_permissions"
(
 "permission_id",
 "user_id"
);

CREATE INDEX "fkIdx_1004" ON "users_permissions"
(
 "created_by"
);

CREATE INDEX "fkIdx_1005" ON "users_permissions"
(
 "updated_by"
);

CREATE INDEX "fkIdx_1006" ON "users_permissions"
(
 "permission_id"
);

CREATE INDEX "fkIdx_1007" ON "users_permissions"
(
 "user_id"
);

CREATE TRIGGER "users_permissions_autoset_update_col" BEFORE UPDATE
ON "users_permissions" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
