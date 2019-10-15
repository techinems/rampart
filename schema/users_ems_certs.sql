CREATE TABLE "users_ems_certs"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "ems_cert_id"   int NOT NULL,
 "expiration"    date NOT NULL,
 "scan_filepath" text NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_598" UNIQUE ( "id" ),
 CONSTRAINT "FK_165" FOREIGN KEY ( "ems_cert_id" ) REFERENCES "ems_certs" ( "id" ),
 CONSTRAINT "FK_168" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_411" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_415" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersEmsCerts" ON "users_ems_certs"
(
 "id"
);

CREATE INDEX "fkIdx_165" ON "users_ems_certs"
(
 "ems_cert_id"
);

CREATE INDEX "fkIdx_168" ON "users_ems_certs"
(
 "user_id"
);

CREATE INDEX "fkIdx_411" ON "users_ems_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_415" ON "users_ems_certs"
(
 "updated_by"
);
