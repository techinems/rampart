import { Request, Response, Router } from "express";
import { User } from "../models/user";

export const metadataRouter = Router();


metadataRouter.get("/isNewUser/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user: User | undefined = (await User.query().where('id', id).orWhere('g_id', id))[0];
    res.send({ isNewUser: user === undefined });
  } catch (err: any) {
    // If there's not a status code in the error we go with 400
    console.error(err);
    res.status(200).send({ isNewUser: true });
  }
});