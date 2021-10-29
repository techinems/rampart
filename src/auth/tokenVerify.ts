import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export type RampartToken = {
    googleId?: string,
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
    if (process.env.JWT_SECRET === undefined || process.env.DB_PASSWORD === undefined) {
        res.status(503);
        res.send({
            errorMessage: "Not enough info to decode token, please check env variables are properly defined!"
        });
        return;
    }
    
    try {
        const parsedToken = jwt.verify(token, process.env.JWT_SECRET + process.env.DB_PASSWORD) as RampartToken;
        // We don't need to check google id because it may be undefined in the rampart token
        if (parsedToken.isService === undefined) {
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

/**
 * Returns the parsed token (this is just a one liner but easier to read)
 * This should never be called in something before the token middleware or it will throw
 * @param req The request object
 * @returns A string with the parsed token
 */
export function getParsedToken(req: Request): RampartToken {
    const token: string | undefined = req.body.parsedToken;
    if (!token) {
        throw new Error("Trying to get parsed token but it is unavailable. This most likely means this was called before the token middleware");
    }
    return req.body.parsedToken;
}