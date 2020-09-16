import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

/**
 * @swagger
 * definitions:
 *  Event:
 *      type: object
 *      required:
 *          - "name"
 *          - "event_type"
 *          - "start"
 *          - "end"
 *          - "created_by"
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *          event_type:
 *              type: integer
 *          start:
 *              type: string
 *          end:
 *              type: string
 *          description:
 *              type: string
 *              nullable: true
 *          location:
 *              type: string
 *              nullable: true
 *          gcal_event_id:
 *              type: string
 *              nullable: true
 *          hidden:
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
export class Event extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private name!: string;
    private event_type!: number;
    private start!: string;
    private end!: string;
    private description?: string;
    private location?: string;
    private gcal_event_id?: string;
    private hidden!: boolean;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "events";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["name", "event_type", "start", "end", "created_by"],

        properties: {
            id: { type: "integer" },
            name: { type: "string" },
            event_type: { type: "integer" },
            start: { type: "string" },
            end: { type: "string" },
            description: { type: "string" },
            location: { type: "string" },
            gcal_event_id: { type: "string" },
            hidden: { type: "boolean" },
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
                from: `${Event.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Event.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}