import * as express from "express";
import * as jwt from "jsonwebtoken";

export const jwtRouter = express.Router();

jwtRouter.get("/issue", (_: express.Request, res: express.Response) => {
    if (process.env.JWT_SECRET === undefined) {
        res.status(503);
        res.send({
            errorMessage: "JWT Secret not specified as environment variable!"
        });
        return;
    }
    // Hard-coded the user permissions for now, but we would fetch what permissions the machine ID has
    const token = jwt.sign({
       permissions: ["user.read", "user.write", "user.update", "user.delete"] 
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    res.send(token);
});