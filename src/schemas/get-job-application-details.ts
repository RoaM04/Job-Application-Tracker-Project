import * as z from "zod/v4";

const optionalSearchField = (maxLengthMessage: string) =>
  z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim() === "") {
        return undefined;
      }

      return value;
    },
    z
      .string()
      .trim()
      .max(100, maxLengthMessage)
      .optional()
  );

export const getJobApplicationDetailsInputSchema = z
  .object({
    company: optionalSearchField(
      "Company name must not exceed 100 characters"
    ).describe("Company name of the job application"),

    jobTitle: optionalSearchField(
      "Job title must not exceed 100 characters"
    ).describe("Job title of the job application"),
  })
  .refine(
    (data) => data.company !== undefined || data.jobTitle !== undefined,
    {
      message: "Provide a company name, job title, or both",
    }
  );