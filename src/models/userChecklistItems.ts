import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { ChecklistItem } from "./checklistItems";

export class UserChecklistItem extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private user_id!: User;
    private checklist_item_id!: ChecklistItem;
    private trainer!: User;
    private timestamp!: string;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "users_checklist_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "checklist_item_id", "trainer", "timestamp", "created_by"],

        properties: {
            user_id: { type: "integer" },
            checklist_item_id: { type: "integer" },
            trainer: { type: "integer" },
            timestamp: { type: "string" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        user_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        checklist_item_id: {
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
                from: `${UserChecklistItem.tableName}.trainer`,
                to: `${User.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserChecklistItem.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}