import { McpServer } from "@modelcontextprotocol/server";

import { searchJobApplicationsInputSchema } from "../schemas/search-job-applications.js";
import { readJobApplications } from "../lib/job-applications-file.js";

export function SearchJobApplicationsTool(
  server: McpServer
): void {
  server.registerTool(
    "search_job_applications",
    {
      title: "Search Job Applications",
      description:
        "Search for job applications by company name, job title, or application status.",
      inputSchema: searchJobApplicationsInputSchema,
    },
    async ({ company, jobTitle, status }) => {
      try {
        const applications =
          await readJobApplications();

        const matchingApplications =
          applications.filter((application) => {
            const matchesCompany =
              !company ||
              application.company
                .toLowerCase()
                .includes(
                  company.trim().toLowerCase()
                );

            const matchesJobTitle =
              !jobTitle ||
              application.jobTitle
                .toLowerCase()
                .includes(
                  jobTitle.trim().toLowerCase()
                );

            const matchesStatus =
              !status ||
              application.status === status;

            return (
              matchesCompany &&
              matchesJobTitle &&
              matchesStatus
            );
          });

        if (
          matchingApplications.length === 0
        ) {
          return {
            content: [
              {
                type: "text",
                text:
                  "No matching job applications were found.",
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message:
                    "Matching job applications retrieved successfully.",
                  count:
                    matchingApplications.length,
                  applications:
                    matchingApplications,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error(
          "[search_job_applications] Failed:",
          error
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Unable to search job applications.",
            },
          ],
        };
      }
    }
  );
}