import * as z from "zod/v4";

export const searchJobApplicationsInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name cannot be empty")
    .max(100, "Company name must not exceed 100 characters")
    .optional()
    .describe("Filter applications by company name."),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title cannot be empty")
    .max(100, "Job title must not exceed 100 characters")
    .optional()
    .describe("Filter applications by job title."),

  status: z
    .enum([
      "Applied",
      "Interview",
      "Accepted",
      "Rejected",
    ])
    .optional()
    .describe("Filter applications by application status."),
});