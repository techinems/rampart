import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { EMSCert } from "./emsCert";

/**
 * @swagger
 * definitions:
 *  UserEMSCert:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "ems_cert_id"
 *          - "expiration"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          ems_cert_id:
 *              type: integer
 *          expiration:
 *              type: string
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
export class UserEMSCert extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private user!: User;
    private emsCert!: EMSCert;
    private expiration!: string;
    private scan_filepath?: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "users_ems_certs";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "ems_cert_id", "expiration", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            ems_cert_id: { type: "integer" },
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
                from: `${UserEMSCert.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        emsCert: {
            relation: Model.BelongsToOneRelation,
            modelClass: EMSCert,
            join: {
                from: `${UserEMSCert.tableName}.ems_cert_id`,
                to: `${EMSCert.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserEMSCert.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserEMSCert.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}