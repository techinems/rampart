CREATE TABLE "fuel_log"
(
 "id"         serial NOT NULL,
 "user_id"    int NOT NULL,
 "vehicle"    int NOT NULL,
 "timestamp"  timestamp NOT NULL,
 "miles"      decimal NOT NULL,
 "fuel"       decimal NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_577" UNIQUE ( "id" ),
 CONSTRAINT "FK_151" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_391" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_395" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_fuelLog" ON "fuel_log"
(
 "id"
);

CREATE INDEX "fkIdx_151" ON "fuel_log"
(
 "user_id"
);

CREATE INDEX "fkIdx_391" ON "fuel_log"
(
 "created_by"
);

CREATE INDEX "fkIdx_395" ON "fuel_log"
(
 "updated_by"
);
