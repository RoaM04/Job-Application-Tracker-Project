import * as z from "zod/v4";

export const removeJobApplicationNoteInputSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100),

  note: z
    .string()
    .trim()
    .min(1, "Note is required")
    .max(500),
});