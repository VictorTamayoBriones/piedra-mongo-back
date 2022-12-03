require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { router } from "./api/router"

//Inicialización del servidor
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.get("*", async (req: express.Request, res: express.Response) => {
    res.status(404).send("This route does not exist.");
});

app.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});