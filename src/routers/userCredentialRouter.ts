import { Router, Request, Response } from "express";
import { UserCredential } from "../models/userCredential";

export const userCredentialRouter = Router();

// Expects as req.body which confirms to the UserCredential object, else errors out and returns a bad request
/**
 * @swagger
 * /user_credential/:
 *   put:
 *     summary: User credential
 *     description: Assign a credential to a user
 *     tags:
 *       - user credential
 *     requestBody:
 *      description: user object 
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UserCredential'
 */
userCredentialRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await UserCredential.transaction(async trx => {
            const query = await UserCredential.query(trx).insert(req.body as UserCredential);
            return query;
        });
        res.send(insertion);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

// Here's a little different in that we query by user_id and it returns all credentials
/**
 * @swagger
 * /user_credential/:user_id:
 *   get:
 *     summary: User's credential
 *     description: Get all credentials for a user
 *     tags:
 *       - user credential
 */
userCredentialRouter.get("/:user_id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.user_id);
        const credentials = await UserCredential.query().where("user_id", id).withGraphFetched("credential");
        res.send(credentials);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 * /user_credential/users/:cred_id:
 *   get:
 *     summary: Users with credential
 *     description: Get all users with a given credential
 *     tags:
 *       - user credential
 */
userCredentialRouter.get("/users/:cred_id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.cred_id);
        const users = await UserCredential.query().where("credential_id", id).withGraphFetched("user(liteUser)");
        res.send(users);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 * /:user_id/:cred_id:
 *   delete:
 *     summary: Delete a credential
 *     description: Delete a user's credential
 *     tags:
 *       - user credential
 */
userCredentialRouter.delete("/:user_id/:cred_id", async (req: Request, res: Response) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const cred_id: number = parseInt(req.params.cred_id);
        const numDeleted = await UserCredential.query().deleteById([user_id, cred_id]);
        res.send({
            numDeleted: numDeleted
        });
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 * /:user_id/:cred_id:
 *   post:
 *     summary: Update a credential
 *     description: Update a user's credential
 *     tags:
 *       - user credential
 */
userCredentialRouter.post("/:user_id/:cred_id", async (req: Request, res: Response) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const cred_id: number = parseInt(req.params.cred_id);
        // This req.body is a partial user_credential which contains the items which are ready to be updated
        const credential = await UserCredential.query().patchAndFetchById([user_id, cred_id], req.body);
        res.send(credential);
    } catch (err: any) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});