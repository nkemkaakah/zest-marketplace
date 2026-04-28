import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { errorResponse } from "../utils/response.js";

interface ValidationSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

interface ValidationIssue {
  path: string;
  message: string;
}

function formatZodIssues(error: ZodError): ValidationIssue[] {
  return error.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join(".") : "root",
    message: issue.message,
  }));
}

export function validate(schemas: ValidationSchemas): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params) as Request["params"];
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query) as Request["query"];
      }
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json(errorResponse("Validation failed", formatZodIssues(error)));
        return;
      }

      next(error);
    }
  };
}
