import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  NightCrew:
 *      type: object
 *      required:
 *          - "date"
 *      properties:
 *          date:
 *              type: string
 *          cc:
 *              type: integer
 *          driver:
 *              type: integer
 *          att1:
 *              type: integer
 *          att2:
 *              type: integer
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
export class NightCrew extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private date!: string;
    private ccUser?: User;
    private driverUser?: User;
    private att1User?: User;
    private att2User?: User;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "night_crews";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["date", "created_by"],

        properties: {
            day: { type: "integer" },
            cc: { type: "integer" },
            driver: { type: "integer" },
            att1: { type: "integer" },
            att2: { type: "integer" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        ccUser: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${NightCrew.tableName}.cc`,
                to: `${User.tableName}.id`
            }
        },
        driverUser: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${NightCrew.tableName}.driver`,
                to: `${User.tableName}.id`
            }
        },
        att1User: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${NightCrew.tableName}.att1`,
                to: `${User.tableName}.id`
            }
        },
        att2User: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${NightCrew.tableName}.att2`,
                to: `${User.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${NightCrew.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${NightCrew.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}