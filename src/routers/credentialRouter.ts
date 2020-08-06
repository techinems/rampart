import { Router, Request, Response } from "express";
import { Credential } from "../models/credential";

export const credentialRouter = Router();

// Expects as req.body which confirms to the credential object, else errors out and returns a bad request
credentialRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await Credential.transaction(async trx => {
            const query = await Credential.query(trx).insert(req.body as Credential);
            return query;
        });
        res.send(insertion);
    } catch (err) {
        console.log(err.message);
        console.log(err.data);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

credentialRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const credential = await Credential.query().findById(id);
        res.send(credential);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

credentialRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const numDeleted = await Credential.query().deleteById(id);
        res.send({
            numDeleted: numDeleted
        });
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

credentialRouter.post("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        // This req.body is a partial credential which contains the items which are ready to be updated
        const credential = await Credential.query().patchAndFetchById(id, req.body);
        res.send(credential);
    } catch (err) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});