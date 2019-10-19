CREATE TABLE "users_other_certs"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "other_cert_id" int NOT NULL,
 "expiration"    date NULL,
 "scan_filepath" text NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_596" UNIQUE ( "id" ),
 CONSTRAINT "FK_182" FOREIGN KEY ( "other_cert_id" ) REFERENCES "other_certs" ( "id" ),
 CONSTRAINT "FK_185" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_420" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_424" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersOtherCerts" ON "users_other_certs"
(
 "id"
);

CREATE INDEX "fkIdx_182" ON "users_other_certs"
(
 "other_cert_id"
);

CREATE INDEX "fkIdx_185" ON "users_other_certs"
(
 "user_id"
);

CREATE INDEX "fkIdx_420" ON "users_other_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_424" ON "users_other_certs"
(
 "updated_by"
);

CREATE TRIGGER "users_other_certs_autoset_update_col" BEFORE UPDATE
ON "users_other_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
