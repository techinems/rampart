CREATE TABLE "eval_items"
(
 "id"            serial NOT NULL,
 "credential_id" int NOT NULL,
 "name"          text NOT NULL,
 "grading_type"  int NOT NULL,
 "active"        boolean NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_588" UNIQUE ( "id" ),
 CONSTRAINT "FK_270" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_542" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_546" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_evalItems" ON "eval_items"
(
 "id"
);

CREATE INDEX "fkIdx_270" ON "eval_items"
(
 "credential_id"
);

CREATE INDEX "fkIdx_542" ON "eval_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_546" ON "eval_items"
(
 "updated_by"
);
