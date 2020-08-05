import * as express from "express";
import { User } from "./models/user";

export const userRouter = express.Router();

// Expects as req.body which confirms to the user object, else errors out and returns a bad request
userRouter.put("/", async (req: express.Request, res: express.Response) => {
    try {
        const insertion = await User.transaction(async trx => {
            const query = await User.query(trx).insert(req.body as User);
            return query;
        });
        res.send(insertion);
    } catch(err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});

userRouter.get("/:id", async (req: express.Request, res: express.Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const user = await User.query().findById(id);
        res.send(user);
    } catch(err) {
        // If there's not a status code in the error we go with 400
        res.status(err.statusCode ?? 400);
        res.send(err);
    }
});