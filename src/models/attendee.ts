import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Event } from "./event";
import { Credential } from "./credential";

/**
 * @swagger
 * definitions:
 *  Attendee:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "event_id"
 *          - "created_by"
 *      properties:
 *          user_id:
 *              type: integer
 *          event_id:
 *              type: string
 *          position:
 *              type: integer
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
export class Attendee extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private AttendeeInfo!: User;
    private EventInfo!: Event;
    private Position!: Credential;
    private hidden!: boolean;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "attendees";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "event_id", "created_by"],

        properties: {
            user_id: { type: "integer" },
            event_id: { type: "integer" },
            position_id: { type: "integer" },
            hidden: { type: "boolean" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: "integer" },
            updated: { type: "string" },
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        AttendeeInfo: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Attendee.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        EventInfo: {
            relation: Model.BelongsToOneRelation,
            modelClass: Event,
            join: {
                from: `${Attendee.tableName}.event_id`,
                to: `${Event.tableName}.id`
            }
        },
        Position: { relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${Attendee.tableName}.position_id`,
                to: `${Credential.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Attendee.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Attendee.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}