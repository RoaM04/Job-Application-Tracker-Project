import { z } from "zod/v4";

export const detectDuplicateApplicationsInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters")
    .describe("Company name of the job application"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters")
    .describe("Job title to check for duplicate applications"),
});