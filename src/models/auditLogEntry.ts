import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  auditLogEntry:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "ip_address"
 *          - "table_modified"
 *      properties:
 *          id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          timestamp:
 *              type: string
 *          ip_address:
 *              type: string
 *          table_modified:
 *              type: string
 *          text:
 *              type: string
 */
export class AuditLogEntry extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private userInfo!: User;
    private timestamp!: string;
    private ip_address!: string;
    private table_modified!: string;
    private text!: string;

    static tableName = "audit_log";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "ip_address", "table_modified", "text"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            ip_address: { type: "string" },
            table_modified: { type: "string" },
            text: { type: "string" }
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
         userInfo: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${AuditLogEntry.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        }
    });
}