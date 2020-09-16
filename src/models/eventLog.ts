import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Event } from "./event";

/**
 * @swagger
 * definitions:
 *  EventLog:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "event_id"
 *          - "created_by"
 *      properties:
 *          id: 
 *              type: integer
 *          user_id:
 *              type: integer
 *          event_id:
 *              type: string
 *          timestamp:
 *              type: string
 *          text:
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
export class EventLog extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private Logger!: User;
    private EventInfo!: Event;
    private timestamp!: string;
    private text!: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "event_logs";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "event_id", "created_by"],

        properties: {
            user_id: { type: "integer" },
            event_id: { type: "integer" },
            timestamp: { type: "string" },
            text: { type: "string" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: "integer" },
            updated: { type: "string" },
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        Logger: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${EventLog.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        EventInfo: {
            relation: Model.BelongsToOneRelation,
            modelClass: Event,
            join: {
                from: `${EventLog.tableName}.event_id`,
                to: `${Event.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${EventLog.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${EventLog.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}