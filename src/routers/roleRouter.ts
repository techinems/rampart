import { Router, Request, Response } from "express";
import { Role } from "../models/role";

export const roleRouter = Router();


// Expects as req.body which confirms to the role object, else errors out and returns a bad request
/**
 * @swagger
 * /role/:
 *   put:
 *     summary: Add role
 *     description: Add a role
 *     tags:
 *       - role
 *     requestBody:
 *      description: role object 
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Role'
 *     responses:
 *          400:
 *              description: error
 */
roleRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await Role.transaction(async trx => {
            const query = await Role.query(trx).insert(req.body as Role);
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
 *  /role/:id:
 *      get:
 *          summary: get a role by id
 *          tags: 
 *              - role
 *          responses:
 *              200:
 *                  description: Role returned
 *                  schema:
 *                      $ref: '#/definitions/Role'
 */
roleRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const role = await Role.query().findById(id);
        res.send(role);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 *  /role/:id:
 *      delete:
 *          summary: delete a role by id
 *          responses:
 *              200:
 *                  description: number deleted
 *          tags: 
 *              - role
 */
roleRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const numDeleted = await Role.query().deleteById(id);
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
 *  /role/:id:
 *      post:
 *          summary: update a role by id
 *          tags: 
 *              - role
 *          requestBody:
 *              description: role object 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/Role'
 */
roleRouter.post("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        // This req.body is a partial role which contains the items which are ready to be updated
        const role = await Role.query().patchAndFetchById(id, req.body);
        res.send(role);
    } catch (err: any) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});