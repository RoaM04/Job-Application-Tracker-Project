import { z } from "zod/v4";

export const deleteJobApplicationInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters")
    .describe("Full name of the company for the application to delete"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters")
    .describe("Full job title of the application to delete"),
});