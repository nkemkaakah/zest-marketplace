import { Router } from "express";
import { authRouter } from "./auth.js";
import { healthRouter } from "./health.js";
import { productsRouter } from "./products.js";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(authRouter);
apiRouter.use(productsRouter);
