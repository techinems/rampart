CREATE TABLE "night_crews"
(
 "date"       date NOT NULL,
 "cc"         int NOT NULL,
 "driver"     int NOT NULL,
 "att1"       int NOT NULL,
 "att2"       int NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_578" UNIQUE ( "date" ),
 CONSTRAINT "FK_135" FOREIGN KEY ( "cc" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_138" FOREIGN KEY ( "driver" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_141" FOREIGN KEY ( "att1" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_144" FOREIGN KEY ( "att2" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_399" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_550" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_nightCrews" ON "night_crews"
(
 "date"
);

CREATE INDEX "fkIdx_135" ON "night_crews"
(
 "cc"
);

CREATE INDEX "fkIdx_138" ON "night_crews"
(
 "driver"
);

CREATE INDEX "fkIdx_141" ON "night_crews"
(
 "att1"
);

CREATE INDEX "fkIdx_144" ON "night_crews"
(
 "att2"
);

CREATE INDEX "fkIdx_399" ON "night_crews"
(
 "created_by"
);

CREATE INDEX "fkIdx_550" ON "night_crews"
(
 "updated_by"
);

CREATE TRIGGER "night_crews_autoset_update_col" BEFORE UPDATE
ON "night_crews" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
