import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Equipment } from "./equipment";

/**
 * @swagger
 * definitions:
 *  RadioDistribution:
 *      type: object
 *      required:
 *          - "rpia_control_number"
 *          - "user_id"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          rpia_control_number:
 *              type: string
 *          user_id:
 *              type: integer
 *          date_out:
 *              type: string
 *          date_in:
 *              type: string
 *              nullable: true (TODO!)
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
export class RadioDistribution extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private equipmentInfo!: Equipment;
    private userInfo!: User;
    private dateOut!: string;
    private dateIn?: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "radio_distribution";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["rpia_control_number", "user_id", "created_by"],

        properties: {
            id: { type: "integer" },
            rpia_control_number: { type: "string" },
            user_id: { type: "integer" },
            dateOut: { type: "string" },
            dateIn: { type: "string" },
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
                from: `${RadioDistribution.tableName}.rpia_control_number`,
                to: `${Equipment.tableName}.rpia_control_number`
            },
        },
        userInfo: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${RadioDistribution.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${RadioDistribution.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${RadioDistribution.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}