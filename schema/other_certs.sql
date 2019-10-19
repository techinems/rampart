CREATE TABLE "other_certs"
(
 "id"         serial NOT NULL,
 "name"       text NOT NULL,
 "org"        text NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_595" UNIQUE ( "id" ),
 CONSTRAINT "FK_494" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_498" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_otherCerts" ON "other_certs"
(
 "id"
);

CREATE INDEX "fkIdx_494" ON "other_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_498" ON "other_certs"
(
 "updated_by"
);

CREATE TRIGGER "other_certs_autoset_update_col" BEFORE UPDATE
ON "other_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
