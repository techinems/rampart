import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { UserCredential } from "../models/userCredential";

export const userCredentialRouter = Router();

// Expects as req.body which confirms to the UserCredential object, else errors out and returns a bad request
userCredentialRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await UserCredential.transaction(async trx => {
            const query = await UserCredential.query(trx).insert(req.body as UserCredential);
            return query;
        });
        res.send(insertion);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

// Here's a little different in that we query by user_id and it returns all credentials
userCredentialRouter.get("/:user_id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.user_id);
        const credentials = await UserCredential.query().where("user_id", id).withGraphFetched("credential");
        res.send(credentials);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

userCredentialRouter.delete("/:user_id/:cred_id", async (req: Request, res: Response) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const cred_id: number = parseInt(req.params.cred_id);
        const numDeleted = await UserCredential.query().where("credential_id", cred_id).where("user_id", user_id).delete();
        res.send({
            numDeleted: numDeleted
        });
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

userCredentialRouter.post("/:user_id/:cred_id", async (req: Request, res: Response) => {
    try {
        const user_id: number = parseInt(req.params.user_id);
        const cred_id: number = parseInt(req.params.cred_id);
        // This req.body is a partial user_credential which contains the items which are ready to be updated
        const credential = await User.query().where("credential_id", cred_id).where("user_id", user_id).patchAndFetch(req.body);
        res.send(credential);
    } catch (err) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});