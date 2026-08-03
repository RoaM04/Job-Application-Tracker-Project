import { McpServer } from "@modelcontextprotocol/server";

import { getJobApplicationDetailsInputSchema } from "../schemas/get-job-application-details.js";
import { readJobApplications } from "../lib/job-applications-file.js";

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

        const normalizedCompany = company?.trim().toLowerCase();
        const normalizedJobTitle = jobTitle?.trim().toLowerCase();

        const matchingApplications = applications.filter(
          (application) => {
            const companyMatches =
              normalizedCompany === undefined ||
              application.company.trim().toLowerCase() ===
                normalizedCompany;

            const jobTitleMatches =
              normalizedJobTitle === undefined ||
              application.jobTitle.trim().toLowerCase() ===
                normalizedJobTitle;

            return companyMatches && jobTitleMatches;
          }
        );

        if (matchingApplications.length === 0) {
          const searchDescription =
            company && jobTitle
              ? `company "${company}" and job title "${jobTitle}"`
              : company
                ? `company "${company}"`
                : `job title "${jobTitle}"`;

          throw new Error(
            `No job application found for ${searchDescription}.`
          );
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: `${matchingApplications.length} matching job application(s) found.`,
                  count: matchingApplications.length,
                  applications: matchingApplications,
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