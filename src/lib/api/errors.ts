export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function parseApiError(response: Response): Promise<ApiError> {
  let message = response.statusText || "Request failed";
  let code: string | undefined;

  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object") {
      if ("message" in body && typeof body.message === "string") {
        message = body.message;
      }
      if ("code" in body && typeof body.code === "string") {
        code = body.code;
      }
    }
  } catch {
    // Response body is not JSON — keep default message.
  }

  return new ApiError(message, response.status, code);
}
