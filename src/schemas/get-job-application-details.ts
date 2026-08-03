import * as z from "zod/v4";

export const getJobApplicationDetailsInputSchema = z
  .object({
    company: z
      .string()
      .trim()
      .min(1, "Company name cannot be empty")
      .max(100, "Company name must not exceed 100 characters")
      .optional()
      .describe("Company name of the job application"),

    jobTitle: z
      .string()
      .trim()
      .min(1, "Job title cannot be empty")
      .max(100, "Job title must not exceed 100 characters")
      .optional()
      .describe("Job title of the job application"),
  })
  .refine(
    (data) => data.company !== undefined || data.jobTitle !== undefined,
    {
      message: "Provide at least a company name or a job title",
    }
  );

export type GetJobApplicationDetailsInput = z.infer<
  typeof getJobApplicationDetailsInputSchema
>;