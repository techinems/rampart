import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  DriversLicense:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "number"
 *          - "state"
 *          - "expiration"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          number:
 *              type: string
 *          state:
 *              type: string
 *          class:
 *              type: string
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
export class DriversLicense extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private user!: User;
    private number!: string;
    private state!: string;
    private class!: string;
    private expiration!: string;
    private scan_filepath?: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "drivers_licenses";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "number", "state", "expiration", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            number: { type: "string" },
            state: { type: "string" },
            class: { type: "string" },
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
                from: `${DriversLicense.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${DriversLicense.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${DriversLicense.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}