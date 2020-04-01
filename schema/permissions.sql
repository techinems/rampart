CREATE TABLE "permissions"
(
 "id"          serial NOT NULL,
 "name"        text NOT NULL,
 "abbr"        text NULL,
 "active"      boolean NOT NULL,
 "description" text NOT NULL,
 "created_by"  int NOT NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_1000" UNIQUE ( "id" ),
 CONSTRAINT "Ind_1001" UNIQUE ( "name" ),
 CONSTRAINT "FK_1001" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_1002" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_positions" ON "permissions"
(
 "id"
);


CREATE INDEX "fkIdx_1001" ON "permissions"
(
 "created_by"
);

CREATE INDEX "fkIdx_1002" ON "permissions"
(
 "updated_by"
);


CREATE TRIGGER "permissions_autoset_update_col" BEFORE UPDATE
ON "permissions" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
