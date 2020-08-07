import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as Knex from "knex";
import { Model } from "objection";
import { userRouter } from "./routers/userRouter";
import { jwtRouter } from "./auth/jwtRouter";
import { permissionsMiddleware } from "./auth/tokenVerify";
import { credentialRouter } from "./routers/credentialRouter";
import { userCredentialRouter } from "./routers/userCredentialRouter";
import { checklistItemRouter } from "./routers/checklistItemRouter";
import { promoRequestRouter } from "./routers/promoRequestRouter";

// Load our environment variables 
dotenv.config();


const app = express();
app.use(bodyParser.json({
  strict: false,
}));

// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
    title: "Rampart",
    version: "1.0.0",
    description: "All ambulance things",
  },
  host: "localhost",
  port: process.env.RAMPART_PORT,
  basePath: "/"
};
const options = {
  swaggerDefinition,
  apis: ["src/models/*","src/routers/*"],
};
const swaggerSpec = swaggerJSDoc(options);

// -- routes for docs and generated swagger spec --

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});


app.get("/docs", (req, res) => {
    res.sendFile("/var/www/app/src/rampartDoc.html");
  });

// Port above 1024 is a good choice as they"re not privileged
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









app.use("/jwt", jwtRouter);
app.get("/", (req: express.Request, res: express.Response) => res.send("Rampart endpoint is online and healthy!"));

// Express middleware order matters, placing it here prevents anything above it from requiring a token
app.use(permissionsMiddleware);
app.use("/credential", credentialRouter);
app.use("/user_credential", userCredentialRouter);
app.use("/checklist_item", checklistItemRouter);
app.use("/promo_request", promoRequestRouter);
app.use("/user", userRouter);

app.listen(port, () => console.log(`Rampart is listening on PORT: ${port}`));