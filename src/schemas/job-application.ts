import * as z from "zod/v4";

export const jobApplicationSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name must not exceed 100 characters"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title must not exceed 100 characters"),

  applicationDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Application date must be in YYYY-MM-DD format"
    ),

  applicationLink: z
    .string()
    .trim()
    .url("Application link must be a valid URL"),

  status: z.enum([
    "Applied",
    "Interview",
    "Accepted",
    "Rejected",
  ]),

  notes: z
    .array(z.string().trim().min(1))
    .default([]),
});

export const jobApplicationsFileSchema = z.array(
  jobApplicationSchema
);

export type JobApplication = z.infer<
  typeof jobApplicationSchema
>;