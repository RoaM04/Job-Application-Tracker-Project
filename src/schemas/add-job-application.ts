import * as z from "zod/v4";

export const addJobApplicationInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters")
    .describe("Name of the company offering the job"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters")
    .describe("Title of the job position"),

  applicationDate: z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in YYYY-MM-DD format"
  )
  .refine(
    (value) => {
      const date = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(date.getTime()) &&
        date.toISOString().startsWith(value);
    },
    "Application date must be a valid calendar date"
  )
  .describe(
    "Date when the application was submitted (YYYY-MM-DD)"
  ),

  applicationLink: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .refine(
      (value) => {
        const url = new URL(value);

        return (
          url.protocol === "http:" ||
          url.protocol === "https:"
        );
      },
      "Application link must use http:// or https://"
    )
    .describe(
      "Enter a complete job application link starting with http:// or https://"
    ),
});