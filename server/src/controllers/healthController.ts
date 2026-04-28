import type { Request, Response } from "express";
import { successResponse } from "../utils/response.js";

export function getHealth(_req: Request, res: Response): void {
  res.json(
    successResponse(
      {
        ok: true,
        service: "zest-api",
      },
      "Health check OK",
    ),
  );
}
