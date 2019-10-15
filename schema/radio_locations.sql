CREATE TABLE "radio_locations"
(
 "id"                serial NOT NULL,
 "equipment_id"      int NOT NULL,
 "radio_coordinator" int NOT NULL,
 "location"          text NOT NULL,
 "created_by"        int NOT NULL,
 "created"           timestamp NOT NULL,
 "updated_by"        int NULL,
 "updated"           timestamp NULL,
 CONSTRAINT "Ind_576" UNIQUE ( "id" ),
 CONSTRAINT "FK_321" FOREIGN KEY ( "equipment_id" ) REFERENCES "equipment" ( "id" ),
 CONSTRAINT "FK_326" FOREIGN KEY ( "radio_coordinator" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_354" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_358" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_radio_locations" ON "radio_locations"
(
 "id"
);

CREATE INDEX "fkIdx_321" ON "radio_locations"
(
 "equipment_id"
);

CREATE INDEX "fkIdx_326" ON "radio_locations"
(
 "radio_coordinator"
);

CREATE INDEX "fkIdx_354" ON "radio_locations"
(
 "created_by"
);

CREATE INDEX "fkIdx_358" ON "radio_locations"
(
 "updated_by"
);
