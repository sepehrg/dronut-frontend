import { ApiError } from "@/api";

export function getApiErrorMessage(error: unknown): string {
  console.log(error)
  if (!(error instanceof ApiError)) {
    return "Something went wrong. Please try again.";
  }

  if (typeof error.data === "object" && error.data !== null) {
    const messages = Object.values(error.data).flat();

    return messages.join(" ");
  }

  return "Something went wrong. Please try again.";
}