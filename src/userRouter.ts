import { Router, Request, Response } from "express";
import { User } from "./models/user";

export const userRouter = Router();

// Expects as req.body which confirms to the user object, else errors out and returns a bad request
userRouter.put("/", async (req: Request, res: Response) => {
    try {
        const insertion = await User.transaction(async trx => {
            const query = await User.query(trx).insert(req.body as User);
            return query;
        });
        res.send(insertion);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const user = await User.query().findById(id);
        res.send(user);
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const numDeleted = await User.query().deleteById(id);
        res.send({
            numDeleted: numDeleted
        });
    } catch (err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

userRouter.post("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    try {
        // This req.body is a partial user which contains the items which are ready to be updated
        const user = await User.query().patchAndFetchById(id, req.body);
        res.send(user);
    } catch (err) {
        console.log(err);
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});