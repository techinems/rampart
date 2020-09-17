import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  FuelLogEntry:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "vehicle"
 *          - "miles"
 *          - "fuel"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          user_id:
 *              type: integer
 *          vehicle:
 *              type: integer
 *          timestamp:
 *              type: string
 *          miles:
 *              type: decimal
 *          fuel:
 *              type: decimal
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
export class FuelLogEntry extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private fueler!: User;
    private vehicle!: number;
    private timestamp!: string;
    private miles!: number;
    private fuel!: number;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "fuel_log";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "vehicle", "miles", "fuel", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            vehicle: { type: "integer" },
            timestamp: { type: "string" },
            miles: { type: "number", minimum: 0 },
            fuel:  { type: "number", minimum: 0 },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: "integer" },
            updated: { type: "string" },
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        fueler: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${FuelLogEntry.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${FuelLogEntry.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${FuelLogEntry.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}