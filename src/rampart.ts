import express from "express";
import * as dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import Knex from "knex";
import { Model } from "objection";
import { userRouter } from "./routers/userRouter";
import { jwtRouter } from "./auth/jwtRouter";
import { credentialRouter } from "./routers/credentialRouter";
import { userCredentialRouter } from "./routers/userCredentialRouter";
import { checklistItemRouter } from "./routers/checklistItemRouter";
import { promoRequestRouter } from "./routers/promoRequestRouter";
import { metadataRouter } from "./routers/metadataRouter";
import { tokenMiddleWare } from "./auth/tokenVerify";
//import { roleRouter } from "./routers/roleRouter";

// Load our environment variables 
dotenv.config();


const app = express();
app.use(express.json({
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
        host: process.env.DB_HOST || "db",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
});

Model.knex(knex);

app.use("/jwt", jwtRouter);
app.get("/", (req: express.Request, res: express.Response) => res.send("Rampart endpoint is online and healthy!"));

// This is the only unauthenticated endpoint
app.use("/metadata", metadataRouter);

// Express middleware order matters, placing it here prevents anything above it from requiring a token
app.use(tokenMiddleWare);
app.use("/credential", credentialRouter);
app.use("/user_credential", userCredentialRouter);
app.use("/checklist_item", checklistItemRouter);
app.use("/promo_request", promoRequestRouter);
app.use("/user", userRouter);
//app.use("/role", roleRouter);

app.listen(port, () => console.log(`Rampart is listening on PORT: ${port}`));