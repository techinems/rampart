import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Credential } from "./credentials";

export class PromoRequest extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private user_id!: User;
    private credential_id!: Credential;
    private approved!: boolean;
    private comments?: string;
    private date!: string;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "eval_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "credential_id", "created_by"],

        properties: {
            id: { type: "integer" },
            user_id: { type: "integer" },
            credential_id: { type: "integer" },
            approved: { type: "boolean" },
            comments: { type: ["string", "null"] },
            date: { type: "string" },
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
                from: `${PromoRequest.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        credential_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${PromoRequest.tableName}.credential_id`,
                to: `${Credential.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequest.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${PromoRequest.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}