CREATE TABLE "default_schedule"
(
 "day"        int NOT NULL,
 "cc"         int NOT NULL,
 "driver"     int NOT NULL,
 "att1"       int NOT NULL,
 "att2"       int NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_579" UNIQUE ( "day" ),
 CONSTRAINT "FK_113" FOREIGN KEY ( "cc" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_116" FOREIGN KEY ( "driver" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_119" FOREIGN KEY ( "att1" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_122" FOREIGN KEY ( "att2" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_403" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_407" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_defaultSchedule" ON "default_schedule"
(
 "day"
);

CREATE INDEX "fkIdx_113" ON "default_schedule"
(
 "cc"
);

CREATE INDEX "fkIdx_116" ON "default_schedule"
(
 "driver"
);

CREATE INDEX "fkIdx_119" ON "default_schedule"
(
 "att1"
);

CREATE INDEX "fkIdx_122" ON "default_schedule"
(
 "att2"
);

CREATE INDEX "fkIdx_403" ON "default_schedule"
(
 "created_by"
);

CREATE INDEX "fkIdx_407" ON "default_schedule"
(
 "updated_by"
);
