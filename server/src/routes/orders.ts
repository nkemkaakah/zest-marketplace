import { Router } from "express";
import { createOrderHandler } from "../controllers/orderController.js";
import { cartSession } from "../middleware/cartSession.js";

export const ordersRouter = Router();

ordersRouter.use(cartSession as never);
ordersRouter.post("/orders", createOrderHandler as never);
