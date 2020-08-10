import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  Role:
 *      type: object
 *      required:
 *          - "officer"
 *          - "admin"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *              nullable: true
 *          officer:
 *              type: boolean
 *          admin:
 *              type: boolean
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
export class Role extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private name?: string;
    private officer!: boolean;
    private admin!: boolean;
    // #TODO: add "visable" boolean if necessary
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "roles";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["officer", "admin", "created_by"],

        properties: {
            id: { type: "integer" },
            name: { type: ["string", "null"] },
            officer:{ type: "boolean" },
            admin: { type: "boolean" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Role.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Role.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}