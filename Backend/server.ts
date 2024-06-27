import express from "express";
import cors from "cors";
import path from "path";
import router from "./src/routes";
import { errorHandler } from "./src/middleware";
import { connectDB } from "./src/db/connection";
import { APP } from "./src/config/app.config";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  express.json({
    limit: "500mb",
  })
);

app.use(
  cors({
    origin: `http://localhost:4200`,
    credentials: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(APP.PORT, () => {
      console.log(`Server started at http://localhost:${APP.PORT}`);
    });
  })
  .catch((error: any) => {
    console.log("Failed to start the server", error);
  });
