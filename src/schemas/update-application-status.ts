import * as z from "zod/v4";

// Tool: update_application_status
export const updateApplicationStatusInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters")
    .describe("Full name of the company for the application to update"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters")
    .describe("Full job title of the application to update"),

  status: z
    .enum(["Applied", "Interview", "Accepted", "Rejected"])
    .describe("New status of the job application"),
});