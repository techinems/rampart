import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { PromoRequest } from "./promoRequest";


export class PromoRequestVote extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */

    private user!: User;
    private promo_request!: PromoRequest;
    private vote!: boolean;
    private comments!: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
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
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequestVote.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        promo_request: {
            relation: Model.BelongsToOneRelation,
            modelClass: PromoRequest,
            join: {
                from: `${PromoRequestVote.tableName}.promo_request_id`,
                to: `${PromoRequest.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequestVote.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequestVote.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}