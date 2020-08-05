import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Credential } from "./credentials";

export class UserCredential extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private user_id!: User;
    private credential_id!: Credential;
    private date_promoted?: string;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "users_credentials";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "credential_id", "created_by"],

        properties: {
            user_id: { type: "integer" },
            credential_id: { type: "integer" },
            date_promoted: { type: ["string", "null"] },
            created_by: { type: "number" },
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
                from: `${UserCredential.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        credential_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${UserCredential.tableName}.credential_id`,
                to: `${Credential.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserCredential.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserCredential.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}