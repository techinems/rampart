import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Credential } from "./credential";

export class EvalItem extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private credential!: Credential;
    private name!: string;
    private grading_type!: number;
    private active!: boolean;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "eval_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["credential_id", "name", "grading_type", "active", "created_by"],

        properties: {
            id: { type: "integer" },
            credential_id: { type: "integer" },
            name: { type: "string" },
            grading_type: { type: "integer" },
            active: { type: "boolean" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        credential: {
            relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${EvalItem.tableName}.credential_id`,
                to: `${Credential.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${EvalItem.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${EvalItem.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}