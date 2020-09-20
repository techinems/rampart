import { Router, Request, Response } from "express";
import { ChecklistItem } from "../models/checklistItems";

export const checklistItemRouter = Router();

// Expects as req.body which confirms to the ChecklistItem object, else errors out and returns a bad request
checklistItemRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await ChecklistItem.transaction(async trx => {
            const query = await ChecklistItem.query(trx).insert(req.body as ChecklistItem);
            return query;
        });
        res.send(insertion);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

checklistItemRouter.get("/credential/:cred_id/:active", async (req: Request, res: Response) => {
    try {
        const cred_id: number = parseInt(req.params.cred_id);
        const act:boolean = (req.params.active == "true");
        const checklistItem = await ChecklistItem.query().where("credential_id", cred_id).where("active", act).withGraphFetched("credential");
        res.send(checklistItem);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

checklistItemRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const checklistItem = await ChecklistItem.query().findById(id).withGraphFetched("credential");
        res.send(checklistItem);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

checklistItemRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const numDeleted = await ChecklistItem.query().deleteById(id);
        res.send({
            numDeleted: numDeleted
        });
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

checklistItemRouter.post("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        // This req.body is a partial ChecklistItem which contains the items which are ready to be updated
        const checklistItem = await ChecklistItem.query().patchAndFetchById(id, req.body);
        res.send(checklistItem);
    } catch (err) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});