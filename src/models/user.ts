import { Model, RelationMappings, RelationMappingsThunk, QueryBuilderType, Modifiers, ModelObject } from "objection";
/**
 * @swagger
 *
 * definitions:
 *   liteUser:
 *      type: object
 *      properties:
 *           id:
 *             type: "integer"
 *           first_name:
 *             type: "string"
 *           last_name: 
 *             type: "string"
 *           nine_hundred:
 *             type: "integer"
 *             nullable: true
 *   User:
 *     type: object
 *     required:
  *       - "first_name"
  *       - "last_name"
  *       - "dob"
  *       - "email"
  *       - "phone"
  *       - "admin"
  *       - "active"
  *       - "access_revoked"
  *       - "g_id"
 *     properties:
 *           id:
 *             type: "integer"
 *           first_name:
 *             type: "string"
 *           last_name: 
 *             type: "string"
 *           nine_hundred:
 *             type: "integer"
 *             nullable: true
 *           dob:
 *             type: "string"
 *           email:
 *             type: "string"
 *           home_street:
 *             type: "string"
 *             nullable: true
 *           home_city:
 *             type: "string"
 *             nullable: true
 *           home_state:
 *             type: "string"
 *             nullable: true
 *           home_zip:
 *             type: "string"
 *             nullable: true
 *           local_street:
 *             type: "string"
 *             nullable: true
 *           local_city:
 *             type: "string"
 *             nullable: true
 *           local_state:
 *             type: "string"
 *             nullable: true
 *           local_zip:
 *             type: "string"
 *             nullable: true
 *           phone:
 *             type: "string"
 *           rcs_id:
 *             type: "string"
 *             nullable: true
 *           rin:
 *             type: "integer"
 *             nullable: true
 *           admin:
 *              type: "boolean" 
 *           last_login:
 *              type: "string"
 *              nullable: true
 *           active:
 *              type: "boolean"
 *           access_revoked:
 *              type: "boolean"
 *           g_id:
 *              type: "string"
 *              nullable: false
 *           slack_id:
 *              type: "string"
 *              nullable: true
 *           created:
 *              type: "string"
 *           updated_by:
 *              type: "integer"
 *              nullable: true
 *           updated:
 *              type: "string"
 *              nullable: true
 */
export class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public nine_hundred?: number;
    public dob!: string;
    public email!: string;
    public home_street?: string;
    public home_city?: string;
    public home_state?: string;
    public home_zip?: string;
    public local_street?: string;
    public local_city?: string;
    public local_state?: string;
    public local_zip?: string;
    public phone!: string;
    public rcs_id?: string;
    public rin?: string;
    public admin!: boolean;
    public last_login?: string;
    public active!: boolean;
    public access_revoked!: boolean;
    public g_id!: string;
    public slack_id?: string;
    public creator!: User;
    public created!: string;
    public updator?: User;
    public updated?: string;

    static tableName = "users";

    // Used for validation, whenever a model is created it checks this
    static jsonSchema = {
        type: "object",
        required: ["first_name", "last_name", "dob", "email", "phone", "admin", "active", "access_revoked", "g_id"],

        properties: {
            id: { type: "integer" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            nine_hundred: { type: ["integer", "null"] },
            dob: { type: "string" },
            email: { type: "string" },
            home_street: { type: ["string", "null"] },
            home_city: { type: ["string", "null"] },
            home_state: { type: ["string", "null"] },
            home_zip: { type: ["string", "null"] },
            local_street: { type: ["string", "null"] },
            local_city: { type: ["string", "null"] },
            local_state: { type: ["string", "null"] },
            local_zip: { type: ["string", "null"] },
            phone: { type: "string" },
            rcs_id: { type: ["string", "null"] },
            rin: { type: ["string", "null"] },
            admin: { type: "boolean" },
            last_login: { type: ["string", "null"] },
            active: { type: "boolean" },
            access_revoked: { type: "boolean" },
            g_id: { type: "string" },
            slack_id: { type: ["string", "null"] },
            created: { type: "string" },
            updated_by: { type: ["integer", "null"] },
            updated: { type: ["string", "null"] } 
        }
    }

    // This object defines the relations to other models. The relationMappings
    // property can be a thunk to prevent circular dependencies.
    static relationMappings: RelationMappingsThunk = (): RelationMappings => ({
        updator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: `${User.tableName}.updated_by`,
                to: `${User.tableName}.id`
            }
        }
    });

    static modifiers: Modifiers = {
        // This is normally the info we want so we can pass this modifer in to modify the query
        liteUser(query: QueryBuilderType<User>): void {
            query.select("id", "first_name", "last_name", "nine_hundred", "admin", "active");
        }
    }
}

export type UserShape = ModelObject<User>;