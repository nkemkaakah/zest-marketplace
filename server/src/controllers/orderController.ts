import type { NextFunction, Response } from "express";
import type { CartSessionRequest } from "../middleware/cartSession.js";
import { createOrder } from "../services/orderService.js";
import { errorResponse, successResponse } from "../utils/response.js";

interface CreateOrderBody {
  firstName?: unknown;
  company?: unknown;
  street?: unknown;
  apartment?: unknown;
  city?: unknown;
  phone?: unknown;
  email?: unknown;
  paymentMethod?: unknown;
}

export async function createOrderHandler(
  req: CartSessionRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const body = req.body as CreateOrderBody;

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const street = typeof body.street === "string" ? body.street.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const paymentMethod =
    body.paymentMethod === "bank" || body.paymentMethod === "cod"
      ? body.paymentMethod
      : null;

  const missing: string[] = [];
  if (firstName.length < 2) missing.push("firstName");
  if (street.length < 4) missing.push("street");
  if (city.length < 2) missing.push("city");
  if (phone.length < 6) missing.push("phone");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push("email");
  if (!paymentMethod) missing.push("paymentMethod");

  if (missing.length > 0) {
    res
      .status(400)
      .json(errorResponse(`Missing or invalid fields: ${missing.join(", ")}`));
    return;
  }

  try {
    const order = await createOrder({
      sessionId: req.cartSessionId,
      firstName,
      company:
        typeof body.company === "string" && body.company.trim().length > 0
          ? body.company.trim()
          : undefined,
      street,
      apartment:
        typeof body.apartment === "string" && body.apartment.trim().length > 0
          ? body.apartment.trim()
          : undefined,
      city,
      phone,
      email,
      paymentMethod: paymentMethod!,
    });
    res.status(201).json(successResponse(order, "Order created"));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Cart is empty") {
        res.status(400).json(errorResponse("Cart is empty"));
        return;
      }
      if (error.message === "Payment failed") {
        res.status(402).json(errorResponse("Payment failed — please try again"));
        return;
      }
    }
    next(error);
  }
}
