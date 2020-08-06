import { Model, RelationMappingsThunk, RelationMappings } from "objection";
import { User } from "./user";
import { Role } from "./role";

export class UserRole extends Model {

    /**
     * The properties in the table
     * Non-null assertion is sadly necessary due to 
     * this class being implicity instantiated which Typescript doesn't see
     */
    private user!: User;
    private position!: Role;
    private start_date!: string;
    private end_date?: string;
    private creator!: User;
    private created!: string;
    private updator?: User;
    private updated?: string;

    static tableName = "users_roles";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["user_id", "position_id", "created_by"],

        properties: {
            user_id: { type: "integer" },
            position_id: { type: "integer" },
            start_date: { type: "string" },
            end_date: { type: ["string", "null"] },
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
                from: `${UserRole.tableName}.user_id`,
                to: `${User.tableName}.id`
            }
        },
        position: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserRole.tableName}.position_id`,
                to: `${Role.tableName}.id`
            }
        },
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserRole.tableName}.created_by`,
                to: `${User.tableName}.id`
            }
        },
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${UserRole.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });
}