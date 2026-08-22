import * as z from "zod/v4";

export const addJobApplicationInputSchema = z.object({
  company: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Company name is required" : undefined,
    })
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters")
    .describe("Name of the company offering the job"),

  jobTitle: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Job title is required" : undefined,
    })
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters")
    .describe("Title of the job position"),

  applicationDate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Application date is required"
          : undefined,
    })
    .trim()
    .superRefine((value, ctx) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        ctx.addIssue({
          code: "custom",
          message: "Date must be in YYYY-MM-DD format",
        });
        return; 
      }

      const year = Number(value.slice(0, 4));
      if (year < 1900 || year > 2100) {
        ctx.addIssue({
          code: "custom",
          message: "Application year must be between 1900 and 2100",
        });
        return;
      }

      const date = new Date(`${value}T00:00:00Z`);
      if (
        Number.isNaN(date.getTime()) ||
        !date.toISOString().startsWith(value)
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Application date must be a valid calendar date",
        });
      }
    })
    .describe("Date when the application was submitted (YYYY-MM-DD)"),

  applicationLink: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Application link is required"
          : undefined,
    })
    .trim()
    .superRefine((value, ctx) => {
      if (value.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Application link is required",
        });
        return;
      }

      let url: URL;
      try {
        url = new URL(value);
      } catch {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a valid URL",
        });
        return; 
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        ctx.addIssue({
          code: "custom",
          message: "Application link must use http:// or https://",
        });
      }
    })
    .describe(
      "Enter a complete job application link starting with http:// or https://"
    ),
});