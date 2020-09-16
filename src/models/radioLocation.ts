import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Equipment } from "./equipment";

/**
 * @swagger
 * definitions:
 *  RadioLocation:
 *      type: object
 *      required:
 *          - "rpia_control_number"
 *          - "location"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          rpia_control_number:
 *              type: string
 *          location:
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
export class RadioLocation extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private equipmentInfo!: Equipment;
    private location!: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "radio_locations";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["rpia_control_number", "location", "created_by"],

        properties: {
            id: { type: "integer" },
            rpia_control_number: { type: "string" },
            location: { type: "string" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: "integer" },
            updated: { type: "string" },
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        equipmentInfo: {
            relation: Model.BelongsToOneRelation,
            modelClass: Equipment,
            join: {
                from: `${RadioLocation.tableName}.rpia_control_number`,
                to: `${Equipment.tableName}.rpia_control_number`
            },
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${RadioLocation.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${RadioLocation.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}