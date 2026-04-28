import { Router } from "express";
import { getProduct, getProducts } from "../controllers/productsController.js";

export const productsRouter = Router();

productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getProduct);
