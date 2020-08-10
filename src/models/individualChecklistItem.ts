import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Credential } from "./credential";

/**
 * @swagger
 * definitions:
 *  UserCheckilstItem:
 *      type: object
 *      required:
 *          - "credential_id"
 *          - "user_id"
 *          - "name"
 *          - "trainer_id"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          credential_id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          name:
 *              type: string
 *          trainer_id:
 *              type: integer
 *          timestamp:
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
export class UserChecklistItem extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private credential!: Credential;
    private user!: User;
    private name!: string;
    private trainer!: User;
    private timestamp!: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "individual_checklist_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["credential_id", "user_id", "name", "trainer_id", "created_by"],

        properties: {
            id: { type: "integer" },
            credential_id: { type: "integer" },
            user_id: { type: "integer" },
            name: { type: "string" },
            trainer_id: { type: "integer" },
            timestamp: { type: "string" },
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
                from: `${UserChecklistItem.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        credential: {
            relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${UserChecklistItem.tableName}.credential_id`,
                to: `${Credential.tableName}.id`
            }
        },
        trainer: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.trainer_id`,
                to: `${User.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}