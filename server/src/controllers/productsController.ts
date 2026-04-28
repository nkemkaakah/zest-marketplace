import type { Request, Response } from "express";
import {
  getProductById,
  getProductBySlug,
  listProducts,
  parseProductQuery,
} from "../services/productService.js";
import { errorResponse, successResponse } from "../utils/response.js";

export function getProducts(req: Request, res: Response): void {
  const result = listProducts(
    parseProductQuery(req.query as Record<string, unknown>),
  );
  res.json(successResponse(result, "Products fetched"));
}

export function getProduct(req: Request, res: Response): void {
  const raw = req.params.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id) {
    res.status(400).json(errorResponse("Missing id"));
    return;
  }
  const byId = getProductById(id);
  const product = byId ?? getProductBySlug(id);
  if (!product) {
    res.status(404).json(errorResponse("Product not found"));
    return;
  }
  res.json(successResponse(product, "Product fetched"));
}
