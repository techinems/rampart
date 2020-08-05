import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";

// Represents a Credential in our database
export class Credential extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private id!: number;
    private name!: string;
    private abbr?: string;
    private major_cred!: boolean;
    private parent_cred?: Credential;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "credentials";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["name", "major_cred", "created_by"],

        properties: {
            id: { type: "integer" },
            name: { type: "string" },
            abbr: { type: ["string", "null"] },
            major_cred: { type: "boolean" },
            parent_cred: { type: ["integer", "null"] },
            created_by: { type: "integer" },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Credential.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${Credential.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}