/*
 Navicat Premium Data Transfer

 Source Server         : Rampart-Dev
 Source Server Type    : PostgreSQL
 Source Server Version : 120002
 Source Host           : 18.232.121.99:5432
 Source Catalog        : rampart
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120002
 File Encoding         : 65001

 Date: 12/04/2020 18:38:52
*/


-- ----------------------------
-- Table structure for credentials
-- ----------------------------
DROP TABLE IF EXISTS "public"."credentials";
CREATE TABLE "public"."credentials" (
  "id" int4 NOT NULL DEFAULT nextval('credentials_id_seq'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "abbr" text COLLATE "pg_catalog"."default",
  "major_cred" bool NOT NULL,
  "parent_cred" int4 NOT NULL,
  "created_by" int4 NOT NULL,
  "created" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" int4,
  "updated" timestamp(6)
)
;
ALTER TABLE "public"."credentials" OWNER TO "postgres";
COMMENT ON COLUMN "public"."credentials"."major_cred" IS 'If false, this will not be shown publicly (e.g. attendant cleared for alphas)';
COMMENT ON COLUMN "public"."credentials"."parent_cred" IS 'This allows us to link credentials together, e.g. P-D --> D --> D-T. Only the highest cred of a particular user in the link of creds will be displayed, and any creds a person has that do not have parentCreds (like FR-CC)';

-- ----------------------------
-- Records of credentials
-- ----------------------------
BEGIN;
INSERT INTO "public"."credentials" VALUES (0, 'Observer', 'O', 't', 0, 0, '2020-04-12 17:03:11.772805', NULL, NULL);
INSERT INTO "public"."credentials" VALUES (1, 'Attendant', 'A', 't', 0, 0, '2020-04-12 17:04:37.55', NULL, '2020-04-12 17:04:37.55');
INSERT INTO "public"."credentials" VALUES (2, 'Attendant Crew Chief', 'A-CC', 't', 1, 0, '2020-04-12 17:05:13.42', NULL, '2020-04-12 17:05:13.42');
INSERT INTO "public"."credentials" VALUES (3, 'Attendant Driver', 'A-D', 't', 1, 0, '2020-04-12 17:13:39.736', NULL, '2020-04-12 17:13:39.736');
INSERT INTO "public"."credentials" VALUES (4, 'Probationary Driver', 'P-D', 't', 3, 0, '2020-04-12 17:14:08.201', NULL, '2020-04-12 17:14:08.201');
INSERT INTO "public"."credentials" VALUES (5, 'Driver', 'D', 't', 4, 0, '2020-04-12 17:14:16.238', NULL, '2020-04-12 17:14:16.238');
INSERT INTO "public"."credentials" VALUES (6, 'Driver Trainer', 'D-T', 't', 5, 0, '2020-04-12 17:14:33.712', NULL, '2020-04-12 17:14:33.712');
INSERT INTO "public"."credentials" VALUES (7, 'Probationary Crew Chief', 'P-CC', 't', 2, 0, '2020-04-12 17:15:43.83', NULL, '2020-04-12 17:15:43.83');
INSERT INTO "public"."credentials" VALUES (8, 'Crew Chief', 'CC', 't', 7, 0, '2020-04-12 17:15:54.326', NULL, '2020-04-12 17:15:54.326');
INSERT INTO "public"."credentials" VALUES (9, 'Crew Chief Trainer', 'CC-T', 't', 8, 0, '2020-04-12 17:16:12.29', NULL, '2020-04-12 17:16:12.29');
INSERT INTO "public"."credentials" VALUES (10, 'FR Crew Chief ', 'FR-CC', 't', 8, 0, '2020-04-12 17:16:54.434', NULL, '2020-04-12 17:16:54.434');
INSERT INTO "public"."credentials" VALUES (11, 'Event EMS Supervisor', 'EES', 't', 8, 0, '2020-04-12 17:17:54.895', NULL, '2020-04-12 17:17:54.895');
INSERT INTO "public"."credentials" VALUES (12, 'Duty Supervisor', 'DS', 't', 0, 0, '2020-04-12 17:18:57.046', NULL, '2020-04-12 17:19:59.111358');
COMMIT;

-- ----------------------------
-- Indexes structure for table credentials
-- ----------------------------
CREATE INDEX "fkIdx_445" ON "public"."credentials" USING btree (
  "created_by" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "fkIdx_449" ON "public"."credentials" USING btree (
  "updated_by" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Triggers structure for table credentials
-- ----------------------------
CREATE TRIGGER "credentials_autoset_update_col" BEFORE UPDATE ON "public"."credentials"
FOR EACH ROW
EXECUTE PROCEDURE "public"."autoset_update_col"();

-- ----------------------------
-- Uniques structure for table credentials
-- ----------------------------
ALTER TABLE "public"."credentials" ADD CONSTRAINT "Ind_586" UNIQUE ("id");
ALTER TABLE "public"."credentials" ADD CONSTRAINT "Ind_586name" UNIQUE ("name");

-- ----------------------------
-- Foreign Keys structure for table credentials
-- ----------------------------
ALTER TABLE "public"."credentials" ADD CONSTRAINT "FK_223" FOREIGN KEY ("parent_cred") REFERENCES "public"."credentials" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."credentials" ADD CONSTRAINT "FK_445" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."credentials" ADD CONSTRAINT "FK_449" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
