import { McpServer } from "@modelcontextprotocol/server";

import { getJobApplicationDetailsInputSchema } from "../schemas/get-job-application-details.js";
import { readJobApplications } from "../lib/job-applications-file.js";

const MAX_RESULTS = 100;

export function registerGetJobApplicationDetailsTool(
  server: McpServer
): void {
  server.registerTool(
    "get_job_application_details",
    {
      title: "Get Job Application Details",
      description:
        "Get all fields of job applications using the company name, job title, or both.",
      inputSchema: getJobApplicationDetailsInputSchema,
    },
    async ({ company, jobTitle }) => {
      try {
        const applications = await readJobApplications();

        const normalizedCompany =
          company?.trim().toLowerCase();

        const normalizedJobTitle =
          jobTitle?.trim().toLowerCase();

        const matchingApplications = applications.filter(
          (application) => {
            const companyMatches =
              normalizedCompany === undefined ||
              application.company
                .trim()
                .toLowerCase() === normalizedCompany;

            const jobTitleMatches =
              normalizedJobTitle === undefined ||
              application.jobTitle
                .trim()
                .toLowerCase() === normalizedJobTitle;

            return companyMatches && jobTitleMatches;
          }
        );

        if (matchingApplications.length === 0) {
  return {
    isError: true,
    content: [
      {
        type: "text",
        text: "No matching job application was found.",
      },
    ],
  };
}

        const limitedApplications =
          matchingApplications.slice(0, MAX_RESULTS);

        const truncated =
          matchingApplications.length > MAX_RESULTS;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: truncated
                    ? `${matchingApplications.length} matching job application(s) found. Returning the first ${MAX_RESULTS}.`
                    : `${matchingApplications.length} matching job application(s) found.`,
                  totalMatches:
                    matchingApplications.length,
                  returned:
                    limitedApplications.length,
                  truncated,
                  applications:
                    limitedApplications,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: message,
                },
                null,
                2
              ),
            },
          ],
        };
      }
    }
  );
}