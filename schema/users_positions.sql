CREATE TABLE "users_positions"
(
 "user_id"     int NOT NULL,
 "position_id" int NOT NULL,
 "start_date"  date NOT NULL,
 "end_date"    date NULL,
 "created_by"  int NOT NULL,
 "created"     timestamp NOT NULL,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_581" UNIQUE ( "user_id", "position_id" ),
 CONSTRAINT "FK_375" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_379" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_49" FOREIGN KEY ( "position_id" ) REFERENCES "positions" ( "id" ),
 CONSTRAINT "FK_52" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersPositions" ON "users_positions"
(
 "user_id",
 "position_id"
);

CREATE INDEX "fkIdx_375" ON "users_positions"
(
 "created_by"
);

CREATE INDEX "fkIdx_379" ON "users_positions"
(
 "updated_by"
);

CREATE INDEX "fkIdx_49" ON "users_positions"
(
 "position_id"
);

CREATE INDEX "fkIdx_52" ON "users_positions"
(
 "user_id"
);
