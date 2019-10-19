CREATE TABLE "equipment"
(
 "id"                  serial NOT NULL,
 "brand"               text NOT NULL,
 "model"               text NOT NULL,
 "serial"              text NULL,
 "rpia_control_number" text NOT NULL,
 "created_by"          int NOT NULL,
 "created"             timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"          int NULL,
 "updated"             timestamp NULL,
 CONSTRAINT "Ind_574" UNIQUE ( "id" ),
 CONSTRAINT "FK_346" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_349" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_equipment_inventory" ON "equipment"
(
 "id"
);

CREATE INDEX "fkIdx_346" ON "equipment"
(
 "created_by"
);

CREATE INDEX "fkIdx_349" ON "equipment"
(
 "updated_by"
);

CREATE TRIGGER "equipment_autoset_update_col" BEFORE UPDATE
ON "equipment" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
