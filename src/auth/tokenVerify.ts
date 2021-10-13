import  { Response, Request, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";

type JWT = {
    permissions: string[];
    [key: string]: string | number | string[] | number[];
};

export function permissionsMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Probably should use a regex to parse the main part of the url out
    let parsedOriginalUrl = req.originalUrl.substring(1);
    const slash_index = parsedOriginalUrl.indexOf("/");
    if (slash_index !== -1) parsedOriginalUrl = parsedOriginalUrl.substring(0, parsedOriginalUrl.indexOf("/"));
    const permission = parsedOriginalUrl + "." + methodToPermission(req.method);
    const token: string | undefined = req.headers.jwt as string | undefined;
    if (token === undefined) {
        res.status(403);
        res.send({
            errorMessage: "No JWT specified!"
        });
        return;
    }
    if (process.env.JWT_SECRET === undefined) {
        res.status(503);
        res.send({
            errorMessage: "JWT Secret not specified as environment variable!"
        });
        return;
    }
    try {
        const parsedToken = jwt.verify(token, process.env.JWT_SECRET) as JWT;
        // Checks if it explicitly has the permission, or all permissions, or all permissions for that group
        if (!(parsedToken.permissions.includes(permission) || parsedToken.permissions.includes("*") || parsedToken.permissions.includes(`${parsedOriginalUrl}.*`))) {
            res.status(503);
            res.send({
                errorMessage: `JWT does not contain ${permission} which is required for this endpoint!`
            });
            return;
        }
    } catch(err) {
        res.status(400);
        res.send({
            errorMessage: "Unable to verify JWT!"
        });
        return;
    }
    next();
}

/**
 * @description Converts http methods to the permissions which are needed to execute
 * @param method The http method
 * @returns A string containing the permission
 */
function methodToPermission(method: string): string {
    if (method === "GET") return "read";
    if (method === "PUT") return "write";
    if (method === "POST") return "update";
    if (method === "DELETE") return "delete";
    // If it hits this case it means it's a method we don't know
    return "";
}


export async function verifyGoogleToken(token: string): Promise<void> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const requestVerification = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    console.log(JSON.stringify(requestVerification.getPayload()));
}