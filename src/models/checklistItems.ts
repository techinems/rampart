import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Credential } from "./credentials";

export class ChecklistItem extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private credential_id!: Credential;
    private text!: string;
    private active!: boolean;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "checklist_items";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["credential_id", "text", "active", "created_by"],

        properties: {
            id: { type: "integer" },
            credential_id: { type: "integer" },
            text: { type: "string" },
            active: { type: "boolean" },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        credential_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: Credential,
            join: {
                from: `${ChecklistItem.tableName}.credential_id`,
                to: `${Credential.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${ChecklistItem.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${ChecklistItem.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}