CREATE TABLE "radio_distribution"
(
 "id"           serial NOT NULL,
 "user_id"      int NOT NULL,
 "equipment_id" int NOT NULL,
 "date_out"     date NOT NULL,
 "date_in"      date NOT NULL,
 "created_by"   int NOT NULL,
 "created"      timestamp NOT NULL,
 "updated_by"   int NULL,
 "updated"      timestamp NULL,
 CONSTRAINT "Ind_575" UNIQUE ( "id" ),
 CONSTRAINT "FK_291" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_301" FOREIGN KEY ( "equipment_id" ) REFERENCES "equipment" ( "id" ),
 CONSTRAINT "FK_306" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_363" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_radio_distribution" ON "radio_distribution"
(
 "id"
);

CREATE INDEX "fkIdx_291" ON "radio_distribution"
(
 "user_id"
);

CREATE INDEX "fkIdx_301" ON "radio_distribution"
(
 "equipment_id"
);

CREATE INDEX "fkIdx_306" ON "radio_distribution"
(
 "created_by"
);

CREATE INDEX "fkIdx_363" ON "radio_distribution"
(
 "updated_by"
);

CREATE TRIGGER "radio_distribution_autoset_update_col" BEFORE UPDATE
ON "radio_distribution" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
