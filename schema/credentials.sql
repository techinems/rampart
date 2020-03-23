CREATE TABLE "credentials"
(
 "id"          serial NOT NULL,
 "name"        text NOT NULL,
 "abbr"        text NULL,
 "major_cred"  boolean NOT NULL,
 "parent_cred" int NOT NULL,
 "created_by"  int NOT NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_586" UNIQUE ( "id" ),
 CONSTRAINT "FK_223" FOREIGN KEY ( "parent_cred" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_445" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_449" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_positions" ON "credentials"
(
 "id"
);

CREATE INDEX "fkIdx_223" ON "credentials"
(
 "parent_cred"
);

CREATE INDEX "fkIdx_445" ON "credentials"
(
 "created_by"
);

CREATE INDEX "fkIdx_449" ON "credentials"
(
 "updated_by"
);

COMMENT ON COLUMN "credentials"."major_cred" IS 'If false, this will not be shown publicly (e.g. attendant cleared for alphas)';
COMMENT ON COLUMN "credentials"."parent_cred" IS 'This allows us to link credentials together, e.g. P-D --> D --> D-T. Only the highest cred of a particular user in the link of creds will be displayed, and any creds a person has that do not have parentCreds (like FR-CC)';

CREATE TRIGGER "credentials_autoset_update_col" BEFORE UPDATE
ON "credentials" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();