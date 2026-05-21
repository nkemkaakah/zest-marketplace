import type { NextFunction, Response } from "express";
import {
  clearCart,
  getCart,
  removeCartItem,
  upsertCartItem,
} from "../services/cartService.js";
import type { CartSessionRequest } from "../middleware/cartSession.js";
import { errorResponse, successResponse } from "../utils/response.js";

export async function getCartHandler(
  req: CartSessionRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const cart = await getCart(req.cartSessionId);
    res.json(successResponse(cart, "Cart fetched"));
  } catch (error) {
    next(error);
  }
}

export async function upsertCartItemHandler(
  req: CartSessionRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { productId } = req.params as { productId: string };
  const body = req.body as { quantity?: unknown };

  if (!productId) {
    res.status(400).json(errorResponse("Missing productId"));
    return;
  }

  const qty = Number(body.quantity);
  if (!Number.isInteger(qty) || qty < 1) {
    res.status(400).json(errorResponse("quantity must be a positive integer"));
    return;
  }

  try {
    const line = await upsertCartItem(req.cartSessionId, productId, qty);
    res.json(successResponse(line, "Cart updated"));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Product not found") {
        res.status(404).json(errorResponse(error.message));
        return;
      }
      if (error.message.startsWith("Only ")) {
        res.status(400).json(errorResponse(error.message));
        return;
      }
    }
    next(error);
  }
}

export async function removeCartItemHandler(
  req: CartSessionRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { productId } = req.params as { productId: string };

  if (!productId) {
    res.status(400).json(errorResponse("Missing productId"));
    return;
  }

  try {
    await removeCartItem(req.cartSessionId, productId);
    res.json(successResponse(null, "Item removed"));
  } catch (error) {
    next(error);
  }
}

export async function clearCartHandler(
  req: CartSessionRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await clearCart(req.cartSessionId);
    res.json(successResponse(null, "Cart cleared"));
  } catch (error) {
    next(error);
  }
}
