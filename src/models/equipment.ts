import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  Equipment:
 *      type: object
 *      required:
 *          - "brand"
 *          - "model"
 *          - "created_by"
 *      properties:
 *          rpia_control_number:
 *              type: string
 *          brand:
 *              type: string
 *          model:
 *              type: string
 *          serial:
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
export class Equipment extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private rpia_control_number!: string;
    private brand!: string;
    private model!: string;
    private serial?: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "equipment";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["brand", "model", "created_by"],

        properties: {
            rpia_control_number: { type: "string" },
            brand: { type: "string" },
            model: { type: "string" },
            serial: { type: "string" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: "integer" },
            updated: { type: "string" },
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Equipment.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Equipment.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}