CREATE TABLE "attendees"
(
 "user_id"    int NOT NULL,
 "event_id"   int NOT NULL,
 "position"   int NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_591" UNIQUE ( "event_id", "user_id" ),
 CONSTRAINT "FK_534" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_538" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_69" FOREIGN KEY ( "event_id" ) REFERENCES "events" ( "id" ),
 CONSTRAINT "FK_72" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_82" FOREIGN KEY ( "position" ) REFERENCES "credentials" ( "id" )
);

CREATE UNIQUE INDEX "PK_eventsUsers" ON "attendees"
(
 "event_id",
 "user_id"
);

CREATE INDEX "fkIdx_534" ON "attendees"
(
 "created_by"
);

CREATE INDEX "fkIdx_538" ON "attendees"
(
 "updated_by"
);

CREATE INDEX "fkIdx_69" ON "attendees"
(
 "event_id"
);

CREATE INDEX "fkIdx_72" ON "attendees"
(
 "user_id"
);

CREATE INDEX "fkIdx_82" ON "attendees"
(
 "position"
);

CREATE TRIGGER "attendees_autoset_update_col" BEFORE UPDATE
ON "attendees" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
