import { Router, Request, Response } from "express";
import { User } from "../models/user";

export const userRouter = Router();


// Expects as req.body which confirms to the user object, else errors out and returns a bad request
/**
 * @swagger
 * /user/:
 *   put:
 *     summary: Add user
 *     description: Add a user
 *     tags:
 *       - user
 *     requestBody:
 *      description: user object 
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *          400:
 *              description: error
 */
userRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await User.transaction(async trx => {
            const query = await User.query(trx).insert(req.body as User);
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
 *  /users:
 *      get:
 *          summary: get all users
 *          tags: 
 *              - user
 *          responses:
 *              200:
 *                  description: User returned
 *                  schema:
 *                      $ref: '#/definitions/liteUser'
 */
userRouter.get("/users/", async (req: Request, res: Response) => {
    try {
        const users = await User.query().modify("liteUser");
        res.send(users);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 *  /user/:id:
 *      get:
 *          summary: get a user by id
 *          tags: 
 *              - user
 *          responses:
 *              200:
 *                  description: User returned
 *                  schema:
 *                      $ref: '#/definitions/User'
 */
userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const user = await User.query().findById(id);
        res.send(user);
    } catch (err: any) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

/**
 * @swagger
 *  /user/:id:
 *      delete:
 *          summary: delete a user by id
 *          responses:
 *              200:
 *                  description: number deleted
 *          tags: 
 *              - user
 */
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const numDeleted = await User.query().deleteById(id);
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
 *  /user/:id:
 *      post:
 *          summary: update a user by id
 *          tags: 
 *              - user
 *          requestBody:
 *              description: user object 
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/User'
 */
userRouter.post("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        // This req.body is a partial user which contains the items which are ready to be updated
        const user = await User.query().patchAndFetchById(id, req.body);
        res.send(user);
    } catch (err: any) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});