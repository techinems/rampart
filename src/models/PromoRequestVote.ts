import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { PromoRequest } from "./promoRequest";


export class PromoRequestVote extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */

    private user_id!: User;
    private promo_request_id!: PromoRequest;
    private vote!: boolean;
    private comments!: string;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "eval_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "promo_request_id", "vote", "comments", "created_by"],

        properties: {
            user_id: { type: "integer" },
            promo_request_id: { type: "integer" },
            vote: { type: "boolean" },
            comments: { type: ["string", "null"] },
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
                from: `${PromoRequestVote.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        promo_request_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: PromoRequest,
            join: {
                from: `${PromoRequestVote.tableName}.promo_request_id`,
                to: `${PromoRequest.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequestVote.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequestVote.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}