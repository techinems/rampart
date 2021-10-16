import * as express from "express";
import * as jwt from "jsonwebtoken";

export const jwtRouter = express.Router();

jwtRouter.post("/issue", (req: express.Request, res: express.Response) => {
    if (!process.env.JWT_SECRET) {
        res.status(503).send({ error: "NO JWT_SECRET SET!" });
        return;
    }
    const googleId: string | undefined = req.body.googleID;
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
        process.env.JWT_SECRET,
        { expiresIn: "1d" });
    res.send({ token });
});

jwtRouter.get("/test", (req, res) => {
    res.send(JSON.stringify(req.headers));
});