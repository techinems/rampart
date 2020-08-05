import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Role } from "./roles";

export class UserRole extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private user_id!: User;
    private position_id!: Role;
    private start_date!: string;
    private end_date?: string;
    private created_by!: User;
    private created!: string;
    private updated_by?: User;
    private updated?: string;

    static tableName = "users_roles";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["name", "major_cred", "created_by"],

        properties: {
            user_id: { type: "integer" },
            position_id: { type: ["string", "null"] },
            start_date: { type: "string" },
            end_date: { type: ["string", "null"] },
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
                from: `${UserRole.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        position_id: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserRole.tableName}.position_id`,
                to: `${Role.tableName}.id`
            }
        },
        created_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserRole.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updated_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserRole.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}