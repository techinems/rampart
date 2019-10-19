CREATE TABLE "users_eval_items"
(
 "id"           serial NOT NULL,
 "user_id"      int NOT NULL,
 "eval_item_id" int NOT NULL,
 "eval_num"     int NOT NULL,
 "score"        int NULL,
 "created_by"   int NOT NULL,
 "created"      timestamp NOT NULL,
 "updated_by"   int NULL,
 "updated"      timestamp NULL,
 CONSTRAINT "Ind_587" UNIQUE ( "id" ),
 CONSTRAINT "FK_279" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_284" FOREIGN KEY ( "eval_item_id" ) REFERENCES "eval_items" ( "id" ),
 CONSTRAINT "FK_510" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_513" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersEvalItems" ON "users_eval_items"
(
 "id"
);

CREATE INDEX "fkIdx_279" ON "users_eval_items"
(
 "user_id"
);

CREATE INDEX "fkIdx_284" ON "users_eval_items"
(
 "eval_item_id"
);

CREATE INDEX "fkIdx_510" ON "users_eval_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_513" ON "users_eval_items"
(
 "updated_by"
);

CREATE TRIGGER "users_eval_items_autoset_update_col" BEFORE UPDATE
ON "users_eval_items" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
