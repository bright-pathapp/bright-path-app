import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const renderError = (
  error: any
): { message: string; status: boolean } => {
  // Handle Prisma-specific errors
  console.log(error, "err");
  if (error.code) {
    // Error codes from Prisma: https://www.prisma.io/docs/reference/api-reference/error-reference
    switch (error.code) {
      case "P2002": // Unique constraint violation
        // Handle both string and array targets
        const target = error.meta?.target;
        let targetField = "";

        if (Array.isArray(target)) {
          targetField = target.join(", ");
        } else if (typeof target === "string") {
          // Extract field name from constraint name (e.g., User_email_key -> email)
          targetField = target.split("_")[1] || target;
        } else {
          targetField = "A field";
        }

        // console.log(error.meta, "meta");
        return {
          status: false,
          message: `${targetField} already exists. Please use another value.`,
        };
      case "P2000": // Value too long
        return {
          status: false,
          message: "Input value is too long for the field.",
        };
      case "P2001": // Record not found
        return {
          status: false,
          message: "The record you're trying to access doesn't exist.",
        };
      case "P2003": // Foreign key constraint failed
        return {
          status: false,
          message: "Related record not found. Check your references.",
        };
      case "P2004": // Constraint failed
        return {
          status: false,
          message: "A constraint failed on the database.",
        };
      case "P2005": // Invalid value for field
        return {
          status: false,
          message: `The value provided for a field is invalid: ${
            error.meta?.field_name || ""
          }`,
        };
      case "P2006": // Invalid data provided
        return {
          status: false,
          message: "The provided value is not valid.",
        };
      case "P2025": // Record required but not found
        return {
          status: false,
          message:
            "Required record not found. The operation cannot be completed.",
        };
      default:
        return {
          status: false,
          message: `Database error: ${error.message}`,
        };
    }
  } else if (error instanceof Error) {
    return {
      status: false,
      message: error.message,
    };
  }

  // Fallback for other types of errors
  return {
    status: false,
    message: "An unexpected error occurred. Please try again.",
  };
};
