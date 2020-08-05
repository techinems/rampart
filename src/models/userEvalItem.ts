import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { EvalItem } from "./evalItem";

export class UserEvalItem extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private user_id!: User;
    private eval_item_id!: EvalItem;
    private eval_num!: number;
    private score?: number; // #TODO: this might need to change to string
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "eval_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "eval_item_id", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            eval_item_id: { type: "integer" },
            eval_num: { type: "integer" },
            score: { type: ["integer", "null"] },
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
                from: `${UserEvalItem.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        eval_item_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: EvalItem,
            join: {
                from: `${UserEvalItem.tableName}.eval_item_id`,
                to: `${EvalItem.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserEvalItem.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserEvalItem.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}