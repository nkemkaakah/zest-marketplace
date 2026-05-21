import type { NextFunction, Request, Response } from "express";
import {
  getProductByIdOrSlug,
  listProducts,
  parseProductQuery,
} from "../services/productService.js";
import { errorResponse, successResponse } from "../utils/response.js";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const result = await listProducts(
      parseProductQuery(req.query as Record<string, unknown>),
    );
    res.json(successResponse(result, "Products fetched"));
  } catch (error) {
    next(error);
  }
}

export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const raw = req.params.idOrSlug;
  const idOrSlug = Array.isArray(raw) ? raw[0] : raw;
  if (!idOrSlug) {
    res.status(400).json(errorResponse("Missing product id or slug"));
    return;
  }
  try {
    const product = await getProductByIdOrSlug(idOrSlug);
    if (!product) {
      res.status(404).json(errorResponse("Product not found"));
      return;
    }
    res.json(successResponse(product, "Product fetched"));
  } catch (error) {
    next(error);
  }
}
