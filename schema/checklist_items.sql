CREATE TABLE "checklist_items"
(
 "id"            serial NOT NULL,
 "credential_id" int NOT NULL,
 "text"          text NOT NULL,
 "active"        boolean NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_583" UNIQUE ( "id" ),
 CONSTRAINT "FK_228" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_469" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_473" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_checklistItems" ON "checklist_items"
(
 "id"
);

CREATE INDEX "fkIdx_228" ON "checklist_items"
(
 "credential_id"
);

CREATE INDEX "fkIdx_469" ON "checklist_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_473" ON "checklist_items"
(
 "updated_by"
);
