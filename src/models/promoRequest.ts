import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Credential } from "./credential";

/**
 * @swagger
 * definitions:
 *  PromoRequest:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "approved"
 *          - "credential_id"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          credential_id:
 *              type: integer
 *          approved:
 *              type: boolean
 *          comments:
 *              type: string
 *              nullable: true
 *          date:
 *              type: string
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
export class PromoRequest extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private user!: User;
    private credential!: Credential;
    private approved!: boolean;
    private comments?: string;
    private date!: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "promo_requests";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "approved", "credential_id", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            credential_id: { type: "integer" },
            approved: { type: "boolean" },
            comments: { type: ["string", "null"] },
            date: { type: "string" },
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
                from: `${PromoRequest.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        credential: {
            relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${PromoRequest.tableName}.credential_id`,
                to: `${Credential.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequest.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequest.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}