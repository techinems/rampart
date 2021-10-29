import { Request, Response, Router } from "express";
import { User } from "../models/user";


// TODO @lramos15 this is a hacky router for a select few routes which either don't require auth or require only service level auth

export const metadataRouter = Router();


metadataRouter.get("/isNewUser/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    let user: User | undefined = undefined;
    if (parseInt(id) < Math.pow(2, 31)) {
      user = (await User.query().where('id', id).orWhere('g_id', id))[0];
    } else {
      user = (await User.query().where('g_id', id))[0];
    }
    res.send({ isNewUser: user === undefined });
  } catch (err: any) {
    // If there's not a status code in the error we go with 400
    console.error(err);
    res.status(200).send({ isNewUser: true });
  }
});

// Expects as req.body which confirms to the user object, else errors out and returns a bad request
/**
 * @swagger
 * /metadata/createUser:
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
metadataRouter.put("/createUser", async (req: Request, res: Response) => {
  try {
    const serviceSecret = req.headers['service-secret'];
    if (serviceSecret !== process.env.JWT_SECRET) {
      res.status(503).send({ success: false, error: "Invalid service secret" });
      return;
    }
    // TODO @lramos15 Ensure that the google id passed to this function is authed with a known google client id to prevent people from making unauthorized accounts
    const insertion = await User.transaction(async trx => {
      try {
        // Mix-in some of the required properties for the insertion
        req.body.access_revoked = false;
        req.body.admin = false;
        req.body.active = true;
        const query = await User.query(trx).insert(req.body as User);
        return query;
      } catch (err) {
        console.error(err);
        return;
      }
    });
    res.send(insertion);
    return;
  } catch (err: any) {
    console.error(err);
    // If there's not a status code in the error we go with 400
    res.status(err.statusCode ?? 400).send(err);
  }
});