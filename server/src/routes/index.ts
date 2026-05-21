import { Router } from "express";
import { authRouter } from "./auth.js";
import { cartRouter } from "./cart.js";
import { healthRouter } from "./health.js";
import { ordersRouter } from "./orders.js";
import { productsRouter } from "./products.js";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(authRouter);
apiRouter.use(productsRouter);
apiRouter.use(cartRouter);
apiRouter.use(ordersRouter);
