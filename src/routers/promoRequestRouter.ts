import { Router, Request, Response } from "express";
import { PromoRequest } from "../models/promoRequest";

export const promoRequestRouter = Router();

// Expects as req.body which confirms to the PromoRequest object, else errors out and returns a bad request
/**
 * @swagger
 * /promo_request/:
 *  put:
 *      summary: Create Promo Req
 *      description: Create a new promotion request for credential
 *      tags:
 *          - promo req
 *      requestBody:
 *          description: PromoRequest Object
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/PromoRequest'
 */
promoRequestRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await PromoRequest.transaction(async trx => {
            const query = await PromoRequest.query(trx).insert(req.body as PromoRequest);
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
 * /promo_request/:id:
 *  get:
 *      summary: Get promo req
 *      description: Get the promo request with `id`
 *      tags:
 *          - promo req
 * 
 */
promoRequestRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const promoRequest = await PromoRequest.query().findById(id).withGraphJoined("credential").withGraphJoined("user(liteUser)");
        res.send(promoRequest);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 * /promo_req/:id:
 *  delete:
 *      summary: Delete promo req
 *      description: Delete the promotion request matching `id`
 *      tags:
 *          - promo req
 */
promoRequestRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const numDeleted = await PromoRequest.query().deleteById(id);
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
 * /promo_req/:id:
 *  post:
 *      summary: Update promo req
 *      description: Update the promotion request matching `id`
 *      tags:
 *          - promo req
 */
promoRequestRouter.post("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        // This req.body is a partial user which contains the items which are ready to be updated
        const promoRequest = await PromoRequest.query().patchAndFetchById(id, req.body);
        res.send(promoRequest);
    } catch (err: any) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});