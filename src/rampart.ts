import * as express from "express";
import * as dotenv from "dotenv";

// Load our environment variables 
dotenv.config();

const app = express();
// Port above 1024 is a good choice as they're not privileged
const port = 8080;

app.get("/", (req: express.Request, res: express.Response) => res.send("Rampart endpoint is online and healthy!"));

app.listen(port, () => console.log(`Rampart is listening on PORT: ${port}`));