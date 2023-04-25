import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { HOST_NAME, PORT, MONGO_URL } from "./config";
import connectDb from "./utils/connectDb";
import router from "./routes";
import deserilizeUser from "./middleware/deserializeUser";
import reqLogger from "./middleware/reqLogger";
import errorLogger from "./middleware/errorLogger";
import requireUser from "./middleware/requireUser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(deserilizeUser);
app.use(reqLogger);
app.use(express.static("public"));

app.use("/api", router);

/** swagger implemantation  */
const swaggerJsDocs = YAML.load("./swaggerDocs.yaml");
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.get("/api/docs.json", (req, res) => {
  res.send(swaggerJsDocs);
});

app.get("/api", requireUser, async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Home route" });
});

/** for the testing swagger */
app.get("/user", async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "hey this is user" });
});

// hey this is the iss

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, messase: "Route not found" });
});

app.use(errorLogger);

app.listen(Number(PORT), HOST_NAME ? HOST_NAME : "localhost", () => {
  console.log(`server is runnign at :http://${HOST_NAME}:${PORT}`);
  connectDb(MONGO_URL);
  // swaggerDocs(app);
});
