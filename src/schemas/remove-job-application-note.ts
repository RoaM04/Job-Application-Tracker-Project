import { z } from "zod/v4";

export const removeJobApplicationNoteInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters")
    .describe("Full company name of the job application"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters")
    .describe("Full job title of the application"),

  note: z
    .string()
    .trim()
    .min(1, "Note is required")
    .max(500, "Note must not exceed 500 characters")
    .describe("The exact note or comment to remove from the job application"),
});