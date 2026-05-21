import { Router } from "express";
import {
  clearCartHandler,
  getCartHandler,
  removeCartItemHandler,
  upsertCartItemHandler,
} from "../controllers/cartController.js";
import { cartSession } from "../middleware/cartSession.js";

export const cartRouter = Router();

cartRouter.use(cartSession as never);

cartRouter.get("/cart", getCartHandler as never);
cartRouter.put("/cart/items/:productId", upsertCartItemHandler as never);
cartRouter.delete("/cart/items/:productId", removeCartItemHandler as never);
cartRouter.delete("/cart", clearCartHandler as never);
