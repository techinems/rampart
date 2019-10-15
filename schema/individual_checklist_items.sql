CREATE TABLE "individual_checklist_items"
(
 "id"            serial NOT NULL,
 "credential_id" int NOT NULL,
 "user_id"       int NOT NULL,
 "name"          text NOT NULL,
 "trainer"       int NOT NULL,
 "timestamp"     timestamp NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_582" UNIQUE ( "id" ),
 CONSTRAINT "FK_333" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_336" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_340" FOREIGN KEY ( "trainer" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_477" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_481" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_individual_checklist_items" ON "individual_checklist_items"
(
 "id"
);

CREATE INDEX "fkIdx_333" ON "individual_checklist_items"
(
 "user_id"
);

CREATE INDEX "fkIdx_336" ON "individual_checklist_items"
(
 "credential_id"
);

CREATE INDEX "fkIdx_340" ON "individual_checklist_items"
(
 "trainer"
);

CREATE INDEX "fkIdx_477" ON "individual_checklist_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_481" ON "individual_checklist_items"
(
 "updated_by"
);
