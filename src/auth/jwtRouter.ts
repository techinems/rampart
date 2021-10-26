import * as express from "express";
import * as jwt from "jsonwebtoken";

export const jwtRouter = express.Router();

jwtRouter.post("/issue", (req: express.Request, res: express.Response) => {
    if (!process.env.JWT_SECRET || !process.env.DB_PASSWORD) {
        res.status(503).send({ error: "Secrets needed to issue token are not set" });
        return;
    }

    // Make sure an authorized service is asking for a token
    // TODO @lramos15 Make this a middleware as we shouldn't have this duplicated in places
    const serviceSecret = req.headers['service-secret'];
    if (serviceSecret !== process.env.JWT_SECRET) {
      res.status(503).send({ success: false, error: "Invalid service secret" });
      return;
    }

    const googleId: string | undefined = req.body.googleId;
    if (googleId && typeof googleId !== 'string') {
        res.status(503).send({ error: "Malformed GOOGLE_ID" });
        return;
    }

    // Issue a token with the users google id.
    // If no google id is provided we assume it is a service and therefore give an all access token (may want permissions later)
    const token = jwt.sign({
        googleId,
        isService: googleId === undefined
    },
        process.env.JWT_SECRET + process.env.DB_PASSWORD,
        { expiresIn: "1d" });
    res.send({ token });
});