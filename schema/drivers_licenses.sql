CREATE TABLE "drivers_licenses"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "number"        text NOT NULL,
 "state"         text NOT NULL,
 "class"         varchar(10) NOT NULL,
 "expiration"    date NOT NULL,
 "scan_filepath" text NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_594" UNIQUE ( "id" ),
 CONSTRAINT "FK_208" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_486" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_490" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_driversLicenses" ON "drivers_licenses"
(
 "id"
);

CREATE INDEX "fkIdx_208" ON "drivers_licenses"
(
 "user_id"
);

CREATE INDEX "fkIdx_486" ON "drivers_licenses"
(
 "created_by"
);

CREATE INDEX "fkIdx_490" ON "drivers_licenses"
(
 "updated_by"
);

CREATE TRIGGER "drivers_licenses_autoset_update_col" BEFORE UPDATE
ON "drivers_licenses" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
