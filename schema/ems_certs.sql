CREATE TABLE "ems_certs"
(
 "id"         serial NOT NULL,
 "name"       text NOT NULL,
 "abbr"       text NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_597" UNIQUE ( "id" ),
 CONSTRAINT "FK_502" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_506" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_emsCerts" ON "ems_certs"
(
 "id"
);

CREATE INDEX "fkIdx_502" ON "ems_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_506" ON "ems_certs"
(
 "updated_by"
);

CREATE TRIGGER "ems_certs_autoset_update_col" BEFORE UPDATE
ON "ems_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
