CREATE TABLE "positions"
(
 "id"         serial NOT NULL,
 "name"       text NOT NULL,
 "officer"    boolean NOT NULL,
 "admin"      boolean NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_580" UNIQUE ( "id" ),
 CONSTRAINT "FK_367" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_371" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_positions" ON "positions"
(
 "id"
);

CREATE INDEX "fkIdx_367" ON "positions"
(
 "created_by"
);

CREATE INDEX "fkIdx_371" ON "positions"
(
 "updated_by"
);

CREATE TRIGGER "positions_autoset_update_col" BEFORE UPDATE
ON "positions" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
