import * as z from "zod/v4";

export const searchJobApplicationsInputSchema = z.object({
  company: z
    .string()
    .trim()
    .max(100)
    .optional()
    .describe("Filter applications by company name."),

  jobTitle: z
    .string()
    .trim()
    .max(100)
    .optional()
    .describe("Filter applications by job title."),

  status: z
    .enum(["Applied", "Interview", "Accepted", "Rejected"])
    .optional()
    .describe("Filter applications by application status."),
});