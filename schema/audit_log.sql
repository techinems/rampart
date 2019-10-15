CREATE TABLE "audit_log"
(
 "id"             serial NOT NULL,
 "user_id"        int NOT NULL,
 "timestamp"      timestamp NOT NULL,
 "ip_address"     cidr NOT NULL,
 "table_modified" text NOT NULL,
 "text"           text NOT NULL,
 CONSTRAINT "Ind_599" UNIQUE ( "id" ),
 CONSTRAINT "FK_558" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_audit_log" ON "audit_log"
(
 "id"
);

CREATE INDEX "fkIdx_558" ON "audit_log"
(
 "user_id"
);
