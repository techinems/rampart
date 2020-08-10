import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { ChecklistItem } from "./checklistItems";

/**
 * @swagger
 * definitions:
 *  UserChecklistItem:
 *      type: object
 *      required:
 *          - "user_id"
 *          - "checklist_item_id"
 *          - "trainer_id"
 *          - "timestamp"
 *          - "created_by"
 *      properties:
 *          user_id:
 *              type: integer
 *          checklist_item_id:
 *              type: integer
 *          trainer_id:
 *              type: integer
 *          timestamp:
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
export class UserChecklistItem extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private user!: User;
    private checklist_item!: ChecklistItem;
    private trainer!: User;
    private timestamp!: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "users_checklist_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "checklist_item_id", "trainer_id", "created_by"],

        properties: {
            user_id: { type: "integer" },
            checklist_item_id: { type: "integer" },
            trainer_id: { type: "integer" },
            timestamp: { type: "string" },
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
                from: `${UserChecklistItem.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        checklist_item: {
            relation: Model.BelongsToOneRelation,
            modelClass: ChecklistItem,
            join: {
                from: `${UserChecklistItem.tableName}.checklist_item_id`,
                to: `${ChecklistItem.tableName}.id`
            }
        },
        trainer: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.trainer_id`,
                to: `${User.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}