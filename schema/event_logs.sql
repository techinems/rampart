CREATE TABLE "event_logs"
(
 "id"         serial NOT NULL,
 "user_id"    int NOT NULL,
 "event_id"   int NOT NULL,
 "timestamp"  timestamp NOT NULL,
 "text"       text NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_593" UNIQUE ( "id" ),
 CONSTRAINT "FK_103" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_429" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_433" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_98" FOREIGN KEY ( "event_id" ) REFERENCES "events" ( "id" )
);

CREATE UNIQUE INDEX "PK_eventLogs" ON "event_logs"
(
 "id"
);

CREATE INDEX "fkIdx_103" ON "event_logs"
(
 "user_id"
);

CREATE INDEX "fkIdx_429" ON "event_logs"
(
 "created_by"
);

CREATE INDEX "fkIdx_433" ON "event_logs"
(
 "updated_by"
);

CREATE INDEX "fkIdx_98" ON "event_logs"
(
 "event_id"
);

CREATE TRIGGER "event_logs_autoset_update_col" BEFORE UPDATE
ON "event_logs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
