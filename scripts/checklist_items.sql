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

 Date: 12/04/2020 18:48:35
*/


-- ----------------------------
-- Table structure for checklist_items
-- ----------------------------
DROP TABLE IF EXISTS "public"."checklist_items";
CREATE TABLE "public"."checklist_items" (
  "id" int4 NOT NULL DEFAULT nextval('checklist_items_id_seq'::regclass),
  "credential_id" int4 NOT NULL,
  "text" text COLLATE "pg_catalog"."default" NOT NULL,
  "active" bool NOT NULL,
  "created_by" int4 NOT NULL,
  "created" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_by" int4,
  "updated" timestamp(6)
)
;
ALTER TABLE "public"."checklist_items" OWNER TO "postgres";

-- ----------------------------
-- Records of checklist_items
-- ----------------------------
BEGIN;
INSERT INTO "public"."checklist_items" VALUES (1, 1, 'OSHA', 't', 0, '2020-04-12 17:34:58.331', NULL, '2020-04-12 17:34:58.331');
INSERT INTO "public"."checklist_items" VALUES (2, 3, 'Driver License', 't', 0, '2020-04-12 17:43:38.959', NULL, '2020-04-12 17:43:38.959');
INSERT INTO "public"."checklist_items" VALUES (3, 7, 'Call Evaluation 1', 't', 0, '2020-04-12 18:01:19.056', NULL, '2020-04-12 18:01:19.056');
INSERT INTO "public"."checklist_items" VALUES (4, 7, 'Call Evaluation 2', 't', 0, '2020-04-12 18:01:25.83', NULL, '2020-04-12 18:01:25.83');
INSERT INTO "public"."checklist_items" VALUES (5, 7, 'Crew Chief Practical', 't', 0, '2020-04-12 18:01:47.659', NULL, '2020-04-12 18:01:47.659');
INSERT INTO "public"."checklist_items" VALUES (6, 2, 'EMT', 't', 0, '2020-04-12 18:03:42.253', NULL, '2020-04-12 18:03:42.253');
INSERT INTO "public"."checklist_items" VALUES (7, 1, 'Attendant Checklist', 't', 0, '2020-04-12 18:06:28.716', NULL, '2020-04-12 18:06:28.716');
INSERT INTO "public"."checklist_items" VALUES (8, 1, 'Lifting and Moving Assessment', 't', 0, '2020-04-12 18:06:37.682', NULL, '2020-04-12 18:06:37.682');
INSERT INTO "public"."checklist_items" VALUES (9, 1, 'Attendant Evaluation', 't', 0, '2020-04-12 18:07:10.494', NULL, '2020-04-12 18:07:10.494');
INSERT INTO "public"."checklist_items" VALUES (10, 1, 'CPR Certification', 't', 0, '2020-04-12 18:07:19.641', NULL, '2020-04-12 18:07:19.641');
INSERT INTO "public"."checklist_items" VALUES (11, 2, 'Crew Chief Class', 't', 0, '2020-04-12 18:10:23.888', NULL, '2020-04-12 18:10:23.888');
INSERT INTO "public"."checklist_items" VALUES (12, 2, 'EPCR Writing Class', 't', 0, '2020-04-12 18:10:42.914', NULL, '2020-04-12 18:10:42.914');
INSERT INTO "public"."checklist_items" VALUES (13, 2, 'Crew Chief Checklist', 't', 0, '2020-04-12 18:10:52.493', NULL, '2020-04-12 18:10:52.493');
INSERT INTO "public"."checklist_items" VALUES (14, 2, 'In-Services Albuterol', 't', 0, '2020-04-12 18:11:44.687', NULL, '2020-04-12 18:11:44.687');
INSERT INTO "public"."checklist_items" VALUES (15, 2, 'In-Services Glucometry', 't', 0, '2020-04-12 18:11:58.271', NULL, '2020-04-12 18:11:58.271');
INSERT INTO "public"."checklist_items" VALUES (16, 2, 'In-Services EPI', 't', 0, '2020-04-12 18:12:05.247', NULL, '2020-04-12 18:12:05.247');
INSERT INTO "public"."checklist_items" VALUES (17, 2, 'In-Services Patella', 't', 0, '2020-04-12 18:12:22.592', NULL, '2020-04-12 18:12:22.592');
INSERT INTO "public"."checklist_items" VALUES (18, 2, 'In-Services Narcan', 't', 0, '2020-04-12 18:12:31.597', NULL, '2020-04-12 18:12:31.597');
INSERT INTO "public"."checklist_items" VALUES (19, 2, 'NIMS IS-005 Hazmat', 't', 0, '2020-04-12 18:13:19.247', NULL, '2020-04-12 18:13:19.247');
INSERT INTO "public"."checklist_items" VALUES (20, 2, 'NIMS IS-100', 't', 0, '2020-04-12 18:13:27.914', NULL, '2020-04-12 18:13:27.914');
INSERT INTO "public"."checklist_items" VALUES (21, 2, 'NIMS IS-200', 't', 0, '2020-04-12 18:13:36.896', NULL, '2020-04-12 18:13:36.896');
INSERT INTO "public"."checklist_items" VALUES (22, 2, 'NIMS IS-700', 't', 0, '2020-04-12 18:13:48.819', NULL, '2020-04-12 18:13:48.819');
INSERT INTO "public"."checklist_items" VALUES (23, 2, 'NIMS IS-800', 't', 0, '2020-04-12 18:13:58.428', NULL, '2020-04-12 18:13:58.428');
INSERT INTO "public"."checklist_items" VALUES (24, 3, 'Driver Class', 't', 0, '2020-04-12 18:14:26.58', NULL, '2020-04-12 18:14:26.58');
INSERT INTO "public"."checklist_items" VALUES (25, 3, 'EVDD Course', 't', 0, '2020-04-12 18:14:36.473', NULL, '2020-04-12 18:14:36.473');
INSERT INTO "public"."checklist_items" VALUES (26, 3, 'Driver Checklist', 't', 0, '2020-04-12 18:14:44.093', NULL, '2020-04-12 18:14:44.093');
INSERT INTO "public"."checklist_items" VALUES (27, 3, 'Ambulance Vehicle Check', 't', 0, '2020-04-12 18:15:00.855', NULL, '2020-04-12 18:15:00.855');
INSERT INTO "public"."checklist_items" VALUES (28, 3, 'NIMS Is-005 Hazmat', 't', 0, '2020-04-12 18:15:16.021', NULL, '2020-04-12 18:15:16.021');
INSERT INTO "public"."checklist_items" VALUES (29, 3, 'NIMS IS-100', 't', 0, '2020-04-12 18:15:38.654', NULL, '2020-04-12 18:15:38.654');
INSERT INTO "public"."checklist_items" VALUES (30, 3, 'NIMS IS-200', 't', 0, '2020-04-12 18:15:48.031', NULL, '2020-04-12 18:15:48.031');
INSERT INTO "public"."checklist_items" VALUES (31, 3, 'NIMS IS-700', 't', 0, '2020-04-12 18:15:56.65', NULL, '2020-04-12 18:15:56.65');
INSERT INTO "public"."checklist_items" VALUES (32, 3, 'NIMS IS-800', 't', 0, '2020-04-12 18:16:14.755', NULL, '2020-04-12 18:16:14.755');
INSERT INTO "public"."checklist_items" VALUES (33, 3, 'Area Hospital Tour', 't', 0, '2020-04-12 18:16:23.097', NULL, '2020-04-12 18:16:23.097');
INSERT INTO "public"."checklist_items" VALUES (34, 3, '5 Hours of Driving', 't', 0, '2020-04-12 18:16:48.839', NULL, '2020-04-12 18:16:48.839');
INSERT INTO "public"."checklist_items" VALUES (35, 4, 'Non-Emergency Response Evaluation 1 ', 't', 0, '2020-04-12 18:17:44.926', NULL, '2020-04-12 18:17:44.926');
INSERT INTO "public"."checklist_items" VALUES (36, 4, 'Non-Emergency Response Evaluation 2', 't', 0, '2020-04-12 18:18:25.63', NULL, '2020-04-12 18:18:25.63');
INSERT INTO "public"."checklist_items" VALUES (37, 4, 'Emergency Response Evaluation', 't', 0, '2020-04-12 18:18:37.502', NULL, '2020-04-12 18:18:37.502');
INSERT INTO "public"."checklist_items" VALUES (38, 4, 'Driver Practical', 't', 0, '2020-04-12 18:18:54.251', NULL, '2020-04-12 18:18:54.251');
INSERT INTO "public"."checklist_items" VALUES (39, 5, 'Call Evaluation 1', 't', 0, '2020-04-12 18:19:14.79', NULL, '2020-04-12 18:19:14.79');
INSERT INTO "public"."checklist_items" VALUES (40, 5, 'Call Evaluation 2', 't', 0, '2020-04-12 18:19:22.783', NULL, '2020-04-12 18:19:22.783');
INSERT INTO "public"."checklist_items" VALUES (41, 6, '3 Months in Service OR 10 Shifts', 't', 0, '2020-04-12 18:20:16.716', NULL, '2020-04-12 18:20:16.716');
INSERT INTO "public"."checklist_items" VALUES (42, 6, 'Class Instruction Evaluation', 't', 0, '2020-04-12 18:21:05.506', NULL, '2020-04-12 18:21:05.506');
INSERT INTO "public"."checklist_items" VALUES (43, 6, 'Call with Emergency Response', 't', 0, '2020-04-12 18:21:27.561', NULL, '2020-04-12 18:21:27.561');
INSERT INTO "public"."checklist_items" VALUES (44, 6, 'Call (With/Without Emergency Response) 1', 't', 0, '2020-04-12 18:21:59.787', NULL, '2020-04-12 18:21:59.787');
INSERT INTO "public"."checklist_items" VALUES (45, 6, 'Call (With/Without Emergency Response) 2', 't', 0, '2020-04-12 18:22:07.841', NULL, '2020-04-12 18:22:07.841');
INSERT INTO "public"."checklist_items" VALUES (46, 6, 'Driver Checklist Item Taught 1', 't', 0, '2020-04-12 18:22:22.186', NULL, '2020-04-12 18:22:22.186');
INSERT INTO "public"."checklist_items" VALUES (47, 6, 'Driver Checklist Item Taught 2', 't', 0, '2020-04-12 18:22:34.417', NULL, '2020-04-12 18:22:34.417');
INSERT INTO "public"."checklist_items" VALUES (48, 6, 'Driver Checklist Item Taught 3', 't', 0, '2020-04-12 18:22:47.584', NULL, '2020-04-12 18:22:47.584');
INSERT INTO "public"."checklist_items" VALUES (49, 6, 'Vehicle Training Session with Trainee', 't', 0, '2020-04-12 18:23:02.446', NULL, '2020-04-12 18:23:02.446');
INSERT INTO "public"."checklist_items" VALUES (50, 8, 'Call Evaluation 1', 't', 0, '2020-04-12 18:23:43.782', NULL, '2020-04-12 18:23:43.782');
INSERT INTO "public"."checklist_items" VALUES (51, 8, 'Call Evaluation 2', 't', 0, '2020-04-12 18:23:49.46', NULL, '2020-04-12 18:23:49.46');
INSERT INTO "public"."checklist_items" VALUES (52, 8, 'Attendant Checklist Item Taught 1', 't', 0, '2020-04-12 18:24:03.384', NULL, '2020-04-12 18:24:03.384');
INSERT INTO "public"."checklist_items" VALUES (53, 8, 'Attendant Checklist Item Taught 2', 't', 0, '2020-04-12 18:24:08.632', NULL, '2020-04-12 18:24:08.632');
INSERT INTO "public"."checklist_items" VALUES (54, 8, 'Attendant Checklist Item Taught 3', 't', 0, '2020-04-12 18:24:14.367', NULL, '2020-04-12 18:24:14.367');
INSERT INTO "public"."checklist_items" VALUES (55, 8, 'Training Event Evaluation', 't', 0, '2020-04-12 18:24:22.586', NULL, '2020-04-12 18:24:22.586');
INSERT INTO "public"."checklist_items" VALUES (56, 10, 'Driver OR Equipment and Vehicle Check', 't', 0, '2020-04-12 18:25:18.259', NULL, '2020-04-12 18:25:18.259');
INSERT INTO "public"."checklist_items" VALUES (57, 10, 'Driver OR Call with Emergency Response', 't', 0, '2020-04-12 18:25:35.16', NULL, '2020-04-12 18:25:35.16');
INSERT INTO "public"."checklist_items" VALUES (58, 10, 'Driver OR Call with/without Emergency Response', 't', 0, '2020-04-12 18:25:49.391', NULL, '2020-04-12 18:25:49.391');
INSERT INTO "public"."checklist_items" VALUES (59, 10, 'Driver OR Driver Practical', 't', 0, '2020-04-12 18:26:00.112', NULL, '2020-04-12 18:26:00.112');
INSERT INTO "public"."checklist_items" VALUES (60, 12, 'Driver', 't', 0, '2020-04-12 18:26:15.11', NULL, '2020-04-12 18:26:15.11');
INSERT INTO "public"."checklist_items" VALUES (61, 12, 'Crew Chief Trainer', 't', 0, '2020-04-12 18:26:34.688', NULL, '2020-04-12 18:26:34.688');
INSERT INTO "public"."checklist_items" VALUES (62, 12, 'Event EMS Supervisor', 't', 0, '2020-04-12 18:26:44.392', NULL, '2020-04-12 18:26:44.392');
INSERT INTO "public"."checklist_items" VALUES (63, 11, 'EES Checklist', 't', 0, '2020-04-12 18:27:05.341', NULL, '2020-04-12 18:27:05.341');
INSERT INTO "public"."checklist_items" VALUES (64, 11, 'In-Services Albuterol', 't', 0, '2020-04-12 18:27:19.459', NULL, '2020-04-12 18:27:19.459');
INSERT INTO "public"."checklist_items" VALUES (65, 11, 'In-Services Glucometry', 't', 0, '2020-04-12 18:27:29.741', NULL, '2020-04-12 18:27:29.741');
INSERT INTO "public"."checklist_items" VALUES (66, 11, 'In-Services EPI', 't', 0, '2020-04-12 18:27:35.848', NULL, '2020-04-12 18:27:35.848');
INSERT INTO "public"."checklist_items" VALUES (67, 11, 'In-Services Patella', 't', 0, '2020-04-12 18:27:42.842', NULL, '2020-04-12 18:27:42.842');
INSERT INTO "public"."checklist_items" VALUES (68, 11, 'In-Services Narcan', 't', 0, '2020-04-12 18:27:50.053', NULL, '2020-04-12 18:27:50.053');
INSERT INTO "public"."checklist_items" VALUES (69, 11, 'In-Services Atropine', 't', 0, '2020-04-12 18:27:58.611', NULL, '2020-04-12 18:27:58.611');
INSERT INTO "public"."checklist_items" VALUES (70, 11, 'NIMS IS-005 Hazmat', 't', 0, '2020-04-12 18:28:11.492', NULL, '2020-04-12 18:28:11.492');
INSERT INTO "public"."checklist_items" VALUES (71, 11, 'NIMS IS-100', 't', 0, '2020-04-12 18:28:35.939', NULL, '2020-04-12 18:28:35.939');
INSERT INTO "public"."checklist_items" VALUES (72, 11, 'NIMS IS-200', 't', 0, '2020-04-12 18:28:44.631', NULL, '2020-04-12 18:28:44.631');
INSERT INTO "public"."checklist_items" VALUES (73, 11, 'NIMS IS-700', 't', 0, '2020-04-12 18:28:55.658', NULL, '2020-04-12 18:28:55.658');
INSERT INTO "public"."checklist_items" VALUES (74, 11, 'NIMS IS-800', 't', 0, '2020-04-12 18:29:04.342', NULL, '2020-04-12 18:29:04.342');
INSERT INTO "public"."checklist_items" VALUES (75, 11, 'NIMS AWR-160-W', 't', 0, '2020-04-12 18:29:13.498', NULL, '2020-04-12 18:29:13.498');
INSERT INTO "public"."checklist_items" VALUES (76, 11, 'Event Evaluation 1', 't', 0, '2020-04-12 18:29:20.777', NULL, '2020-04-12 18:29:20.777');
INSERT INTO "public"."checklist_items" VALUES (77, 11, 'Event Evaluation 2', 't', 0, '2020-04-12 18:29:28.24', NULL, '2020-04-12 18:29:28.24');
COMMIT;

-- ----------------------------
-- Indexes structure for table checklist_items
-- ----------------------------
CREATE UNIQUE INDEX "PK_checklistItems" ON "public"."checklist_items" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "fkIdx_228" ON "public"."checklist_items" USING btree (
  "credential_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "fkIdx_469" ON "public"."checklist_items" USING btree (
  "created_by" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "fkIdx_473" ON "public"."checklist_items" USING btree (
  "updated_by" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Triggers structure for table checklist_items
-- ----------------------------
CREATE TRIGGER "checklist_items_autoset_update_col" BEFORE UPDATE ON "public"."checklist_items"
FOR EACH ROW
EXECUTE PROCEDURE "public"."autoset_update_col"();

-- ----------------------------
-- Uniques structure for table checklist_items
-- ----------------------------
ALTER TABLE "public"."checklist_items" ADD CONSTRAINT "Ind_583" UNIQUE ("id", "text");

-- ----------------------------
-- Foreign Keys structure for table checklist_items
-- ----------------------------
ALTER TABLE "public"."checklist_items" ADD CONSTRAINT "FK_228" FOREIGN KEY ("credential_id") REFERENCES "public"."credentials" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."checklist_items" ADD CONSTRAINT "FK_469" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."checklist_items" ADD CONSTRAINT "FK_473" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
