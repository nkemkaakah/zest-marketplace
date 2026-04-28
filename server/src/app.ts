import "dotenv/config";
import cors from "cors";
import express from "express";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
