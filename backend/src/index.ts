import express from "express";
import { notFoundHandler } from "./middleware/notfound.middleware";
import { errorHandler } from "./middleware/error.middleware";
import cors from "cors";
import { ENV } from "./config";
import { routes } from "./routes/routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(ENV.PORT, () => {
  console.log(`running on port http://localhost:${ENV.PORT}`);
});