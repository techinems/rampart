-- FUNCTIONS
CREATE OR REPLACE FUNCTION autoset_update_col()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- USERS
CREATE TABLE "users"
(
 "id"             serial NOT NULL,
 "first_name"     text NOT NULL,
 "last_name"      text NOT NULL,
 "nine_hundred"   int NULL,
 "dob"            date NOT NULL,
 "email"          text NOT NULL,
 "home_street"    text NULL,
 "home_city"      text NULL,
 "home_state"     text NULL,
 "home_zip"       text NULL,
 "local_street"   text NULL,
 "local_city"     text NULL,
 "local_state"    text NULL,
 "local_zip"      text NULL,
 "phone"          text NOT NULL,
 "rcs_id"         text NULL,
 "rin"            int NULL,
 "admin"          boolean NOT NULL,
 "last_login"     timestamp NULL,
 "active"         boolean NOT NULL,
 "access_revoked" boolean NOT NULL,
 "g_id"           text NULL,
 "slack_id"       text NULL,
 "created_by"     int NOT NULL,
 "created"        timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"     int NULL,
 "updated"        timestamp NULL,
 CONSTRAINT "Ind_573id" UNIQUE ( "id" ),
 CONSTRAINT "FK_383" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_387" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_users" ON "users"
(
 "id"
);

CREATE INDEX "fkIdx_383" ON "users"
(
 "created_by"
);

CREATE INDEX "fkIdx_387" ON "users"
(
 "updated_by"
);

CREATE TRIGGER "users_autoset_timestamp_cols" BEFORE UPDATE
ON "users" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- Create first user otherwise we in trouble
INSERT INTO users (id, first_name, last_name, dob, email, phone, admin, active, access_revoked, created_by)
    VALUES (0, 'RPI', 'Ambulance', date '1970-01-01', 'admin@rpi.edu', '5189772963', TRUE, TRUE, FALSE, 0);

-- OTHER_CERTS
CREATE TABLE "other_certs"
(
 "id"         serial NOT NULL,
 "name"       text NOT NULL,
 "org"        text NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_595" UNIQUE ( "id" ),
 CONSTRAINT "FK_494" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_498" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_otherCerts" ON "other_certs"
(
 "id"
);

CREATE INDEX "fkIdx_494" ON "other_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_498" ON "other_certs"
(
 "updated_by"
);

CREATE TRIGGER "other_certs_autoset_update_col" BEFORE UPDATE
ON "other_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- NIGHT_CREWS
CREATE TABLE "night_crews"
(
 "date"       date NOT NULL,
 "cc"         int NOT NULL,
 "driver"     int NOT NULL,
 "att1"       int NOT NULL,
 "att2"       int NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_578" UNIQUE ( "date" ),
 CONSTRAINT "FK_135" FOREIGN KEY ( "cc" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_138" FOREIGN KEY ( "driver" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_141" FOREIGN KEY ( "att1" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_144" FOREIGN KEY ( "att2" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_399" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_550" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_nightCrews" ON "night_crews"
(
 "date"
);

CREATE INDEX "fkIdx_135" ON "night_crews"
(
 "cc"
);

CREATE INDEX "fkIdx_138" ON "night_crews"
(
 "driver"
);

CREATE INDEX "fkIdx_141" ON "night_crews"
(
 "att1"
);

CREATE INDEX "fkIdx_144" ON "night_crews"
(
 "att2"
);

CREATE INDEX "fkIdx_399" ON "night_crews"
(
 "created_by"
);

CREATE INDEX "fkIdx_550" ON "night_crews"
(
 "updated_by"
);

CREATE TRIGGER "night_crews_autoset_update_col" BEFORE UPDATE
ON "night_crews" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- FUEL_LOG
CREATE TABLE "fuel_log"
(
 "id"         serial NOT NULL,
 "user_id"    int NOT NULL,
 "vehicle"    int NOT NULL,
 "timestamp"  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "miles"      decimal NOT NULL,
 "fuel"       decimal NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_577" UNIQUE ( "id" ),
 CONSTRAINT "FK_151" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_391" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_395" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_fuelLog" ON "fuel_log"
(
 "id"
);

CREATE INDEX "fkIdx_151" ON "fuel_log"
(
 "user_id"
);

CREATE INDEX "fkIdx_391" ON "fuel_log"
(
 "created_by"
);

CREATE INDEX "fkIdx_395" ON "fuel_log"
(
 "updated_by"
);

CREATE TRIGGER "fuel_log_autoset_update_col" BEFORE UPDATE
ON "fuel_log" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- EVENTS
CREATE TABLE "events"
(
 "id"            serial NOT NULL,
 "name"          text NOT NULL,
 "event_type"    int NOT NULL,
 "start"         timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "end"           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- EQUIPMENT
CREATE TABLE "equipment"
(
 "id"                  serial NOT NULL,
 "brand"               text NOT NULL,
 "model"               text NOT NULL,
 "serial"              text NULL,
 "rpia_control_number" text NOT NULL,
 "created_by"          int NOT NULL,
 "created"             timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"          int NULL,
 "updated"             timestamp NULL,
 CONSTRAINT "Ind_574" UNIQUE ( "id" ),
 CONSTRAINT "FK_346" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_349" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_equipment_inventory" ON "equipment"
(
 "id"
);

CREATE INDEX "fkIdx_346" ON "equipment"
(
 "created_by"
);

CREATE INDEX "fkIdx_349" ON "equipment"
(
 "updated_by"
);

CREATE TRIGGER "equipment_autoset_update_col" BEFORE UPDATE
ON "equipment" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- EMS_CERTS
CREATE TABLE "ems_certs"
(
 "id"         serial NOT NULL,
 "name"       text NOT NULL,
 "abbr"       text NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_597" UNIQUE ( "id" ),
 CONSTRAINT "FK_502" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_506" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_emsCerts" ON "ems_certs"
(
 "id"
);

CREATE INDEX "fkIdx_502" ON "ems_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_506" ON "ems_certs"
(
 "updated_by"
);

CREATE TRIGGER "ems_certs_autoset_update_col" BEFORE UPDATE
ON "ems_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- DRIVER_LICENSES
CREATE TABLE "drivers_licenses"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "number"        text NOT NULL,
 "state"         text NOT NULL,
 "class"         varchar(10) NOT NULL,
 "expiration"    date NOT NULL,
 "scan_filepath" text NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_594" UNIQUE ( "id" ),
 CONSTRAINT "FK_208" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_486" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_490" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_driversLicenses" ON "drivers_licenses"
(
 "id"
);

CREATE INDEX "fkIdx_208" ON "drivers_licenses"
(
 "user_id"
);

CREATE INDEX "fkIdx_486" ON "drivers_licenses"
(
 "created_by"
);

CREATE INDEX "fkIdx_490" ON "drivers_licenses"
(
 "updated_by"
);

CREATE TRIGGER "drivers_licenses_autoset_update_col" BEFORE UPDATE
ON "drivers_licenses" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- DEFAULT_SCHEDULE
CREATE TABLE "default_schedule"
(
 "day"        int NOT NULL,
 "cc"         int NOT NULL,
 "driver"     int NOT NULL,
 "att1"       int NOT NULL,
 "att2"       int NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_579" UNIQUE ( "day" ),
 CONSTRAINT "FK_113" FOREIGN KEY ( "cc" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_116" FOREIGN KEY ( "driver" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_119" FOREIGN KEY ( "att1" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_122" FOREIGN KEY ( "att2" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_403" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_407" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_defaultSchedule" ON "default_schedule"
(
 "day"
);

CREATE INDEX "fkIdx_113" ON "default_schedule"
(
 "cc"
);

CREATE INDEX "fkIdx_116" ON "default_schedule"
(
 "driver"
);

CREATE INDEX "fkIdx_119" ON "default_schedule"
(
 "att1"
);

CREATE INDEX "fkIdx_122" ON "default_schedule"
(
 "att2"
);

CREATE INDEX "fkIdx_403" ON "default_schedule"
(
 "created_by"
);

CREATE INDEX "fkIdx_407" ON "default_schedule"
(
 "updated_by"
);

CREATE TRIGGER "default_schedule_autoset_update_col" BEFORE UPDATE
ON "default_schedule" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- ROLES
CREATE TABLE "roles"
(
 "id"          serial NOT NULL,
 "name"        text,
 "officer"     boolean NOT NULL,
 "coordinator" boolean NOT NULL,
 "created_by"  int NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_923" UNIQUE ( "id" ),
 CONSTRAINT "FK_924" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_925" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_roles_c" ON "roles"
(
 "id"
);

CREATE INDEX "fkIdx_924" ON "roles"
(
 "created_by"
);

CREATE INDEX "fkIdx_925" ON "roles"
(
 "updated_by"
);

COMMENT ON COLUMN "roles"."officer" IS 'For showing of officers in tables';
COMMENT ON COLUMN "roles"."coordinator" IS 'For showing of coordinators in tables';

CREATE TRIGGER "roles_autoset_update_col" BEFORE UPDATE
ON "roles" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- USERS ROLES
CREATE TABLE "users_roles"
(
 "id"          serial NOT NULL,
 "role_id"     int NOT NULL,
 "user_id"     int NOT NULL,
 "start_date"  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "end_date"    timestamp,
 "created_by"  int NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_926" UNIQUE ( "id" ),
 CONSTRAINT "FK_927" FOREIGN KEY ("role_id") REFERENCES "roles" ("id"),
 CONSTRAINT "FK_928" FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
 CONSTRAINT "FK_929" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_930" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_user_roles_c" ON "users_roles"
(
 "id"
);

CREATE INDEX "fkIdx_927" ON "users_roles"
(
 "role_id"
);

CREATE INDEX "fkIdx_928" ON "users_roles"
(
 "user_id"
);

CREATE INDEX "fkIdx_929" ON "users_roles"
(
 "created_by"
);

CREATE INDEX "fkIdx_930" ON "users_roles"
(
 "updated_by"
);

CREATE TRIGGER "user_roles_autoset_update_col" BEFORE UPDATE
ON "users_roles" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- CREDENTIALS
CREATE TABLE "credentials"
(
 "id"          serial NOT NULL,
 "name"        text NOT NULL,
 "abbr"        text NULL,
 "major_cred"  int NULL,
 "parent_cred" int NULL,
 "role_id"     int NULL,
 "created_by"  int NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_586" UNIQUE ( "id" ),
 CONSTRAINT "FK_223" FOREIGN KEY ( "parent_cred" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_224" FOREIGN KEY ( "major_cred" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_950" FOREIGN KEY ( "role_id" ) REFERENCES "roles" ( "id" ),
 CONSTRAINT "FK_445" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_449" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_credentials_c" ON "credentials"
(
 "id"
);

CREATE INDEX "fkIdx_223" ON "credentials"
(
 "parent_cred"
);

CREATE INDEX "fkIdx_224" ON "credentials"
(
 "major_cred"
);

CREATE INDEX "fkIdx_950" ON "credentials"
(
 "role_id"
);

CREATE INDEX "fkIdx_445" ON "credentials"
(
 "created_by"
);

CREATE INDEX "fkIdx_449" ON "credentials"
(
 "updated_by"
);

COMMENT ON COLUMN "credentials"."major_cred" IS 'If NOT NULL, this will not be shown publicly (e.g. attendant cleared for alphas). Key points to the major cred';
COMMENT ON COLUMN "credentials"."parent_cred" IS 'This allows us to link credentials together, e.g. P-D --> D --> D-T. Only the highest cred of a particular user in the link of creds will be displayed, and any creds a person has that do not have parentCreds (like FR-CC)';

CREATE TRIGGER "credentials_autoset_update_col" BEFORE UPDATE
ON "credentials" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- AUDIT_LOG
CREATE TABLE "audit_log"
(
 "id"             serial NOT NULL,
 "user_id"        int NOT NULL,
 "timestamp"      timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- USERS_OTHER_CERTS
CREATE TABLE "users_other_certs"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "other_cert_id" int NOT NULL,
 "expiration"    date NULL,
 "scan_filepath" text NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_596" UNIQUE ( "id" ),
 CONSTRAINT "FK_182" FOREIGN KEY ( "other_cert_id" ) REFERENCES "other_certs" ( "id" ),
 CONSTRAINT "FK_185" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_420" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_424" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersOtherCerts" ON "users_other_certs"
(
 "id"
);

CREATE INDEX "fkIdx_182" ON "users_other_certs"
(
 "other_cert_id"
);

CREATE INDEX "fkIdx_185" ON "users_other_certs"
(
 "user_id"
);

CREATE INDEX "fkIdx_420" ON "users_other_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_424" ON "users_other_certs"
(
 "updated_by"
);

CREATE TRIGGER "users_other_certs_autoset_update_col" BEFORE UPDATE
ON "users_other_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- USERS_EMS_CERTS
CREATE TABLE "users_ems_certs"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "ems_cert_id"   int NOT NULL,
 "expiration"    date NOT NULL,
 "scan_filepath" text NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_598" UNIQUE ( "id" ),
 CONSTRAINT "FK_165" FOREIGN KEY ( "ems_cert_id" ) REFERENCES "ems_certs" ( "id" ),
 CONSTRAINT "FK_168" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_411" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_415" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersEmsCerts" ON "users_ems_certs"
(
 "id"
);

CREATE INDEX "fkIdx_165" ON "users_ems_certs"
(
 "ems_cert_id"
);

CREATE INDEX "fkIdx_168" ON "users_ems_certs"
(
 "user_id"
);

CREATE INDEX "fkIdx_411" ON "users_ems_certs"
(
 "created_by"
);

CREATE INDEX "fkIdx_415" ON "users_ems_certs"
(
 "updated_by"
);

CREATE TRIGGER "users_ems_certs_autoset_update_col" BEFORE UPDATE
ON "users_ems_certs" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- USERS_CREDENTIALS
CREATE TABLE "users_credentials"
(
 "user_id"       int NOT NULL,
 "credential_id" int NOT NULL,
 "date_promoted" date NOT NULL DEFAULT CURRENT_DATE,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_585" UNIQUE ( "credential_id" ),
 CONSTRAINT "FK_453" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_457" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_86" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_91" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_usersCredentials" ON "users_credentials"
(
 "credential_id",
 "user_id"
);

CREATE INDEX "fkIdx_453" ON "users_credentials"
(
 "created_by"
);

CREATE INDEX "fkIdx_457" ON "users_credentials"
(
 "updated_by"
);

CREATE INDEX "fkIdx_86" ON "users_credentials"
(
 "credential_id"
);

CREATE INDEX "fkIdx_91" ON "users_credentials"
(
 "user_id"
);

CREATE TRIGGER "users_credentials_autoset_update_col" BEFORE UPDATE
ON "users_credentials" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- RADIO_LOCATIONS
CREATE TABLE "radio_locations"
(
 "id"                serial NOT NULL,
 "equipment_id"      int NOT NULL,
 "radio_coordinator" int NOT NULL,
 "location"          text NOT NULL,
 "created_by"        int NOT NULL,
 "created"           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"        int NULL,
 "updated"           timestamp NULL,
 CONSTRAINT "Ind_576" UNIQUE ( "id" ),
 CONSTRAINT "FK_321" FOREIGN KEY ( "equipment_id" ) REFERENCES "equipment" ( "id" ),
 CONSTRAINT "FK_326" FOREIGN KEY ( "radio_coordinator" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_354" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_358" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_radio_locations" ON "radio_locations"
(
 "id"
);

CREATE INDEX "fkIdx_321" ON "radio_locations"
(
 "equipment_id"
);

CREATE INDEX "fkIdx_326" ON "radio_locations"
(
 "radio_coordinator"
);

CREATE INDEX "fkIdx_354" ON "radio_locations"
(
 "created_by"
);

CREATE INDEX "fkIdx_358" ON "radio_locations"
(
 "updated_by"
);

CREATE TRIGGER "radio_locations_autoset_update_col" BEFORE UPDATE
ON "radio_locations" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- RADIO_DISTRIBUTION
CREATE TABLE "radio_distribution"
(
 "id"           serial NOT NULL,
 "user_id"      int NOT NULL,
 "equipment_id" int NOT NULL,
 "date_out"     date NOT NULL,
 "date_in"      date NOT NULL,
 "created_by"   int NOT NULL,
 "created"      timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"   int NULL,
 "updated"      timestamp NULL,
 CONSTRAINT "Ind_575" UNIQUE ( "id" ),
 CONSTRAINT "FK_291" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_301" FOREIGN KEY ( "equipment_id" ) REFERENCES "equipment" ( "id" ),
 CONSTRAINT "FK_306" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_363" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_radio_distribution" ON "radio_distribution"
(
 "id"
);

CREATE INDEX "fkIdx_291" ON "radio_distribution"
(
 "user_id"
);

CREATE INDEX "fkIdx_301" ON "radio_distribution"
(
 "equipment_id"
);

CREATE INDEX "fkIdx_306" ON "radio_distribution"
(
 "created_by"
);

CREATE INDEX "fkIdx_363" ON "radio_distribution"
(
 "updated_by"
);

CREATE TRIGGER "radio_distribution_autoset_update_col" BEFORE UPDATE
ON "radio_distribution" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- PROMO_REQUESTS
CREATE TABLE "promo_requests"
(
 "id"            serial NOT NULL,
 "user_id"       int NOT NULL,
 "credential_id" int NOT NULL,
 "approved"      boolean NOT NULL,
 "comments"      text NULL,
 "date"          date NOT NULL DEFAULT CURRENT_DATE,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- PROMO_REQUEST_VOTES
CREATE TABLE "promo_request_votes"
(
 "user_id"          int NOT NULL,
 "promo_request_id" int NOT NULL,
 "vote"             boolean NULL,
 "comments"         text NOT NULL,
 "created_by"       int NOT NULL,
 "created"          timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- INDIVIDUAL_CHECKLIST_ITEMS
CREATE TABLE "individual_checklist_items"
(
 "id"            serial NOT NULL,
 "credential_id" int NOT NULL,
 "user_id"       int NOT NULL,
 "name"          text NOT NULL,
 "trainer_id"    int NOT NULL,
 "timestamp"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_582" UNIQUE ( "id" ),
 CONSTRAINT "FK_333" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_336" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_340" FOREIGN KEY ( "trainer_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_477" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_481" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_individual_checklist_items" ON "individual_checklist_items"
(
 "id"
);

CREATE INDEX "fkIdx_333" ON "individual_checklist_items"
(
 "user_id"
);

CREATE INDEX "fkIdx_336" ON "individual_checklist_items"
(
 "credential_id"
);

CREATE INDEX "fkIdx_340" ON "individual_checklist_items"
(
 "trainer_id"
);

CREATE INDEX "fkIdx_477" ON "individual_checklist_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_481" ON "individual_checklist_items"
(
 "updated_by"
);

CREATE TRIGGER "individual_checklist_items_autoset_update_col" BEFORE UPDATE
ON "individual_checklist_items" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- EVENT_LOGS
CREATE TABLE "event_logs"
(
 "id"         serial NOT NULL,
 "user_id"    int NOT NULL,
 "event_id"   int NOT NULL,
 "timestamp"  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- EVAL_ITEMS
CREATE TABLE "eval_items"
(
 "id"            serial NOT NULL,
 "credential_id" int NOT NULL,
 "name"          text NOT NULL,
 "grading_type"  int NOT NULL,
 "active"        boolean NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"    int NULL,
 "updated"       timestamp NULL,
 CONSTRAINT "Ind_588" UNIQUE ( "id" ),
 CONSTRAINT "FK_270" FOREIGN KEY ( "credential_id" ) REFERENCES "credentials" ( "id" ),
 CONSTRAINT "FK_542" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_546" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_evalItems" ON "eval_items"
(
 "id"
);

CREATE INDEX "fkIdx_270" ON "eval_items"
(
 "credential_id"
);

CREATE INDEX "fkIdx_542" ON "eval_items"
(
 "created_by"
);

CREATE INDEX "fkIdx_546" ON "eval_items"
(
 "updated_by"
);

CREATE TRIGGER "eval_items_autoset_update_col" BEFORE UPDATE
ON "eval_items" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- CHECKLIST_ITEMS
CREATE TABLE "checklist_items"
(
 "id"            serial NOT NULL,
 "credential_id" int NOT NULL,
 "text"          text NOT NULL,
 "active"        boolean NOT NULL,
 "created_by"    int NOT NULL,
 "created"       timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

CREATE TRIGGER "checklist_items_autoset_update_col" BEFORE UPDATE
ON "checklist_items" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- ATTENDEES
 CREATE TABLE "attendees"
(
 "user_id"    int NOT NULL,
 "event_id"   int NOT NULL,
 "position_id" int NULL,
 "hidden"     boolean NOT NULL,
 "created_by" int NOT NULL,
 "created"    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by" int NULL,
 "updated"    timestamp NULL,
 CONSTRAINT "Ind_591" UNIQUE ( "event_id", "user_id" ),
 CONSTRAINT "FK_534" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_538" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_69" FOREIGN KEY ( "event_id" ) REFERENCES "events" ( "id" ),
 CONSTRAINT "FK_72" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_82" FOREIGN KEY ( "position_id" ) REFERENCES "credentials" ( "id" )
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
 "position_id"
);

CREATE TRIGGER "attendees_autoset_update_col" BEFORE UPDATE
ON "attendees" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- USER_EVAL_ITEMS
CREATE TABLE "users_eval_items"
(
 "id"           serial NOT NULL,
 "user_id"      int NOT NULL,
 "eval_item_id" int NOT NULL,
 "eval_num"     int NOT NULL,
 "score"        int NULL,
 "created_by"   int NOT NULL,
 "created"      timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- USER_CHECKLIST_ITEMS
CREATE TABLE "users_checklist_items"
(
 "user_id"           int NOT NULL,
 "checklist_item_id" int NOT NULL,
 "trainer_id"        int NOT NULL,
 "timestamp"         timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "created_by"        int NOT NULL,
 "created"           timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"        int NULL,
 "updated"           timestamp NULL,
 CONSTRAINT "Ind_584" UNIQUE ( "user_id", "checklist_item_id" ),
 CONSTRAINT "FK_234" FOREIGN KEY ( "checklist_item_id" ) REFERENCES "checklist_items" ( "id" ),
 CONSTRAINT "FK_238" FOREIGN KEY ( "user_id" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_241" FOREIGN KEY ( "trainer_id" ) REFERENCES "users" ( "id" ),
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
 "trainer_id"
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

-- PERMISSIONS
CREATE TABLE "permissions"
(
 "id"          serial NOT NULL,
 "permission"  text NOT NULL,
 "text"        text NULL,
 "created_by"  int NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_931" UNIQUE ( "id" ),
 CONSTRAINT "FK_932" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_933" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_permissions_c" ON "permissions"
(
 "id"
);

CREATE INDEX "fkIdx_932" ON "permissions"
(
 "created_by"
);

CREATE INDEX "fkIdx_933" ON "permissions"
(
 "updated_by"
);

CREATE TRIGGER "permissions_autoset_update_col" BEFORE UPDATE
ON "permissions" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- USERS PERMISSIONS
CREATE TABLE "users_permissions"
(
 "permission_id"     int NOT NULL,
 "user_id"     int NOT NULL,
 "created_by"  int NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_934" UNIQUE ( "permission_id", "user_id" ),
 CONSTRAINT "FK_935" FOREIGN KEY ( "permission_id" ) REFERENCES "permissions" ("id"),
 CONSTRAINT "FK_936" FOREIGN KEY ( "user_id" ) REFERENCES "users" ("id"),
 CONSTRAINT "FK_937" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_938" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_users_permissions_c" ON "users_permissions"
(
 "permission_id",
 "user_id"
);

CREATE INDEX "fkIdx_935" ON "users_permissions"
(
 "permission_id"
);

CREATE INDEX "fkIdx_936" ON "users_permissions"
(
 "user_id"
);

CREATE INDEX "fkIdx_937" ON "users_permissions"
(
 "created_by"
);

CREATE INDEX "fkIdx_938" ON "users_permissions"
(
 "updated_by"
);

CREATE TRIGGER "users_permissions_autoset_update_col" BEFORE UPDATE
ON "users_permissions" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();

-- ROLES PERMISSIONS
CREATE TABLE "roles_permissions"
(
 "permission_id"     int NOT NULL,
 "role_id"     int NOT NULL,
 "created_by"  int NULL,
 "created"     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 "updated_by"  int NULL,
 "updated"     timestamp NULL,
 CONSTRAINT "Ind_940" UNIQUE ( "permission_id", "role_id" ),
 CONSTRAINT "FK_941" FOREIGN KEY ( "permission_id" ) REFERENCES "permissions" ("id"),
 CONSTRAINT "FK_942" FOREIGN KEY ( "role_id" ) REFERENCES "roles" ("id"),
 CONSTRAINT "FK_943" FOREIGN KEY ( "created_by" ) REFERENCES "users" ( "id" ),
 CONSTRAINT "FK_944" FOREIGN KEY ( "updated_by" ) REFERENCES "users" ( "id" )
);

CREATE UNIQUE INDEX "PK_roles_permissions_c" ON "roles_permissions"
(
 "permission_id",
 "role_id"
);

CREATE INDEX "fkIdx_941" ON "roles_permissions"
(
 "permission_id"
);

CREATE INDEX "fkIdx_942" ON "roles_permissions"
(
 "role_id"
);

CREATE INDEX "fkIdx_943" ON "roles_permissions"
(
 "created_by"
);

CREATE INDEX "fkIdx_944" ON "roles_permissions"
(
 "updated_by"
);

CREATE TRIGGER "roles_permissions_autoset_update_col" BEFORE UPDATE
ON "roles_permissions" FOR EACH ROW EXECUTE PROCEDURE
autoset_update_col();