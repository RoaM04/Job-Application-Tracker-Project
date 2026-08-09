import * as z from "zod/v4";

const optionalText = (schema: z.ZodString) =>
  z.preprocess(
    (value) =>
      typeof value === "string" &&
      value.trim() === ""
        ? undefined
        : value,
    schema.optional()
  );

export const updateJobApplicationDetailsInputSchema =
  z.object({
    company: z
      .string()
      .trim()
      .min(1, "Company name is required")
      .max(
        100,
        "Company name must not exceed 100 characters"
      )
      .describe(
        "Current company name of the job application"
      ),

    jobTitle: z
      .string()
      .trim()
      .min(1, "Job title is required")
      .max(
        100,
        "Job title must not exceed 100 characters"
      )
      .describe(
        "Current job title of the application"
      ),

    newCompany: optionalText(
      z
        .string()
        .trim()
        .min(
          1,
          "New company name cannot be empty"
        )
        .max(
          100,
          "New company name must not exceed 100 characters"
        )
    ).describe("New company name"),

    newJobTitle: optionalText(
      z
        .string()
        .trim()
        .min(
          1,
          "New job title cannot be empty"
        )
        .max(
          100,
          "New job title must not exceed 100 characters"
        )
    ).describe("New job title"),

    newApplicationDate: optionalText(
      z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Date must be in YYYY-MM-DD format"
        )
    ).describe(
      "New application date in YYYY-MM-DD format"
    ),

    newApplicationLink: optionalText(
      z
        .string()
        .trim()
        .url("Please enter a valid URL")
        .refine(
          (value) => {
            const url = new URL(value);

            return (
              url.protocol === "http:" ||
              url.protocol === "https:"
            );
          },
          "Application link must use http:// or https://"
        )
    ).describe(
      "New job application link starting with http:// or https://"
    ),
  });