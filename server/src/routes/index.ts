import { Router } from "express";
import { healthRouter } from "./health.js";
import { productsRouter } from "./products.js";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(productsRouter);
