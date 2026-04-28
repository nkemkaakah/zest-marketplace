export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: unknown;
}

export function successResponse<T>(
  data: T,
  message = "Success",
): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(
  message: string,
  errors: unknown = null,
): ApiErrorResponse {
  return {
    success: false,
    message,
    errors,
  };
}
