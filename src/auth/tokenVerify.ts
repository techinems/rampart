import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

type RampartToken = {
    googleId: string,
    isService: boolean
};

export function tokenMiddleWare(req: Request, res: Response, next: NextFunction): void {
    // Probably should use a regex to parse the main part of the url out
    const token: string | undefined = req.headers['rampart-token'] as string | undefined;
    if (token === undefined) {
        res.status(403);
        res.send({
            errorMessage: "No JWT specified!"
        });
        return;
    }
    if (process.env.JWT_SECRET === undefined || process.env.DB_PASSWORD) {
        res.status(503);
        res.send({
            errorMessage: "Not enough info to decode token, please check env variables are properly defined!"
        });
        return;
    }

    const serviceSecret = req.headers['service-secret'];
    if (serviceSecret !== process.env.JWT_SECRET) {
      res.status(503).send({ errorMessage: "Invalid service secret" });
      return;
    }

    try {
        const parsedToken = jwt.verify(token, process.env.JWT_SECRET + process.env.DB_PASSWORD) as RampartToken;
        if (parsedToken.googleId === undefined || parsedToken.isService === undefined) {
            res.status(503).send({ errorMessage: "Bad token shape!" });
        }
        req.body.parsedToken = parsedToken;
    } catch (err) {
        res.status(400);
        res.send({
            errorMessage: "Unable to verify JWT!"
        });
        return;
    }
    next();
}