CREATE TABLE "events"
(
 "id"            serial NOT NULL,
 "name"          text NOT NULL,
 "event_type"    int NOT NULL,
 "start"         timestamp NOT NULL,
 "end"           timestamp NOT NULL,
 "description"   text NULL,
 "location"      text NULL,
 "gcal_event_id" text NULL,
 "hidden"        boolean NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_592" UNIQUE ( "id" ),
 CONSTRAINT "FK_437" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_441" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_events" ON "events"
(
 "id"
);

CREATE INDEX "fkIdx_437" ON "events"
(
 "created_by"
);

CREATE INDEX "fkIdx_441" ON "events"
(
 "updated_by"
);

CREATE TRIGGER "events_autoset_update_col" BEFORE UPDATE
ON "events" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
