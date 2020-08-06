import { Router, Request, Response } from "express";
import { PromoRequest } from "../models/promoRequest";

export const promoRequestRouter = Router();

// Expects as req.body which confirms to the PromoRequest object, else errors out and returns a bad request
promoRequestRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await PromoRequest.transaction(async trx => {
            const query = await PromoRequest.query(trx).insert(req.body as PromoRequest);
            return query;
        });
        res.send(insertion);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

promoRequestRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const promoRequest = await PromoRequest.query().findById(id).withGraphJoined("credential").withGraphJoined("user");
        res.send(promoRequest);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

promoRequestRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const numDeleted = await PromoRequest.query().deleteById(id);
        res.send({
            numDeleted: numDeleted
        });
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

promoRequestRouter.post("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        // This req.body is a partial user which contains the items which are ready to be updated
        const user = await PromoRequest.query().patchAndFetchById(id, req.body);
        res.send(user);
    } catch (err) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});