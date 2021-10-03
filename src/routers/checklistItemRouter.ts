import { Router, Request, Response } from "express";
import { ChecklistItem } from "../models/checklistItems";

export const checklistItemRouter = Router();

// Expects as req.body which confirms to the ChecklistItem object, else errors out and returns a bad request
/**
 * @swagger
 * /checklist_item/:
 *   put:
 *     summary: Checklist Item
 *     description:  Create a new checklist item
 *     tags:
 *       - checklist items
 *     requestBody:
 *      description: ChecklistItem Object
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ChecklistItem'
 */
checklistItemRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await ChecklistItem.transaction(async trx => {
            const query = await ChecklistItem.query(trx).insert(req.body as ChecklistItem);
            return query;
        });
        res.send(insertion);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 * /checklist_item/credential/:cred_id/:active:
 *   get:
 *     summary: Checklist by credential
 *     description:  Get the :active checklist items for :cred_id checklist. :active should be either "true" or "false".
 *     tags:
 *       - checklist items
 */
checklistItemRouter.get("/credential/:cred_id/:active", async (req: Request, res: Response) => {
    try {
        const cred_id: number = parseInt(req.params.cred_id);
        const act:boolean = (req.params.active == "true");
        const checklistItem = await ChecklistItem.query().where("credential_id", cred_id).where("active", act).withGraphFetched("credential");
        res.send(checklistItem);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});


/**
 * @swagger
 * /checklist_item/:id:
 *   get:
 *     summary: Checklist Item by ID
 *     description:  Get the checklist item matching :id
 *     tags:
 *       - checklist items
 */
checklistItemRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const checklistItem = await ChecklistItem.query().findById(id).withGraphFetched("credential");
        res.send(checklistItem);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 * /checklist_item/:id:
 *   delete:
 *     summary: Checklist Item by ID
 *     description:  Delete the checklist item matching :id
 *     tags:
 *       - checklist items
 */
checklistItemRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const numDeleted = await ChecklistItem.query().deleteById(id);
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
 * /checklist_item/:id:
 *   post:
 *     summary: Checklist Item by ID
 *     description:  Update the checklist item matching :id
 *     tags:
 *       - checklist items
 */
checklistItemRouter.post("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        // This req.body is a partial ChecklistItem which contains the items which are ready to be updated
        const checklistItem = await ChecklistItem.query().patchAndFetchById(id, req.body);
        res.send(checklistItem);
    } catch (err: any) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});