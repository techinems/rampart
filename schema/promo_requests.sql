CREATE TABLE "promo_requests"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "credential_id" int NOT NULL,
 "approved"      boolean NOT NULL,
 "comments"      text NULL,
 "date"          date NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_589" UNIQUE ( "id" ),
 CONSTRAINT "FK_250" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_253" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_518" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_522" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_promoRequests" ON "promo_requests"
(
 "id"
);

CREATE INDEX "fkIdx_250" ON "promo_requests"
(
 "credential_id"
);

CREATE INDEX "fkIdx_253" ON "promo_requests"
(
 "user_id"
);

CREATE INDEX "fkIdx_518" ON "promo_requests"
(
 "created_by"
);

CREATE INDEX "fkIdx_522" ON "promo_requests"
(
 "updated_by"
);

CREATE TRIGGER "promo_requests_autoset_update_col" BEFORE UPDATE
ON "promo_requests" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
