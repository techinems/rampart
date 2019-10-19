CREATE TABLE "users_checklist_items"
(
 "user_id"           int NOT NULL,
 "checklist_item_id" int NOT NULL,
 "trainer"           int NOT NULL,
 "timestamp"         timestamp NOT NULL,
 "created_by"        int NOT NULL,
 "created"           timestamp NOT NULL,
 "updated_by"        int NULL,
 "updated"           timestamp NULL,
 CONSTRAINT "Ind_584" UNIQUE ( "user_id", "checklist_item_id" ),
 CONSTRAINT "FK_234" FOREIGN KEY ( "checklist_item_id" ) REFERENCES "checklist_items" ( "id" ),
 CONSTRAINT "FK_238" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_241" FOREIGN KEY ( "trainer" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_461" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_465" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersChecklistItems" ON "users_checklist_items"
(
 "checklist_item_id",
 "user_id"
);

CREATE INDEX "fkIdx_234" ON "users_checklist_items"
(
 "checklist_item_id"
);

CREATE INDEX "fkIdx_238" ON "users_checklist_items"
(
 "user_id"
);

CREATE INDEX "fkIdx_241" ON "users_checklist_items"
(
 "trainer"
);

CREATE INDEX "fkIdx_461" ON "users_checklist_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_465" ON "users_checklist_items"
(
 "updated_by"
);

CREATE TRIGGER "users_checklist_items_autoset_update_col" BEFORE UPDATE
ON "users_checklist_items" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
