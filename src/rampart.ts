import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as Knex from "knex";
import { Model } from "objection";
import { userRouter } from "./userRouter";

// Load our environment variables 
dotenv.config();

const app = express();
app.use(bodyParser.json());
// Port above 1024 is a good choice as they're not privileged
const port = process.env.RAMPART_PORT;

const knex = Knex({
    client: "postgres",
    connection: {
        host: "db",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

Model.knex(knex);

app.use("/user", userRouter);
app.get("/", (req: express.Request, res: express.Response) => res.send("Rampart endpoint is online and healthy!"));

app.listen(port, () => console.log(`Rampart is listening on PORT: ${port}`));