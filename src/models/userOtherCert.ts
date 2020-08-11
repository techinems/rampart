import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { OtherCert } from "./otherCert";

/**
 * @swagger
 * definitions:
 *  UserEMSCert:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "other_cert_id"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          other_cert_id:
 *              type: integer
 *          expiration:
 *              type: string
 *              nullable: true
 *          scan_filepath:
 *              type: string
 *              nullable: true
 *          created_by:
 *              type: integer
 *          created:
 *              type: string
 *          updated_by:
 *              type: integer
 *              nullable: true
 *          updated:
 *              type: string
 *              nullable: true
 */
export class UserOtherCert extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private user!: User;
    private OtherCert!: OtherCert;
    private expiration?: string;
    private scan_filepath?: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "users_ems_certs";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "other_cert_id", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            other_cert_id: { type: "integer" },
            expiration: { type: "string" },
            scan_filepath: { type: "string" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserOtherCert.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        emsCert: {
            relation: Model.BelongsToOneRelation,
            modelClass: OtherCert,
            join: {
                from: `${UserOtherCert.tableName}.other_cert_id`,
                to: `${OtherCert.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserOtherCert.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserOtherCert.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}