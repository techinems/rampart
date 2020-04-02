CREATE TABLE "promo_request_votes"
("user_id"          int NOT NULL,
 "promo_request_id" int NOT NULL,
 "vote"             boolean NULL,
 "comments"         text NOT NULL,
 "created_by"       int NOT NULL,
 "created"          timestamp NOT NULL,
 "updated_by"       int NULL,
 "updated"          timestamp NULL,
 CONSTRAINT "Ind_590" UNIQUE ( "user_id", "promo_request_id" ),
 CONSTRAINT "FK_260" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_264" FOREIGN KEY ( "promo_request_id" ) REFERENCES "promo_requests" ( "id" ),
 CONSTRAINT "FK_526" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_530" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_promoRequestVotes" ON "promo_request_votes"
(
 "user_id",
 "promo_request_id"
);

CREATE INDEX "fkIdx_260" ON "promo_request_votes"
(
 "user_id"
);

CREATE INDEX "fkIdx_264" ON "promo_request_votes"
(
 "promo_request_id"
);

CREATE INDEX "fkIdx_526" ON "promo_request_votes"
(
 "created_by"
);

CREATE INDEX "fkIdx_530" ON "promo_request_votes"
(
 "updated_by"
);

CREATE TRIGGER "promo_request_votes_autoset_update_col" BEFORE UPDATE
ON "promo_request_votes" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();
