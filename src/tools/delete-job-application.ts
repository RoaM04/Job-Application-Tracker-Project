import { McpServer } from "@modelcontextprotocol/server";

import { deleteJobApplicationInputSchema } from "../schemas/delete-job-application.js";
import { deleteJobApplication } from "../lib/job-applications.js";

export function registerDeleteJobApplicationTool(
  server: McpServer
): void {
  server.registerTool(
    "delete_job_application",
    {
      description:
        "Delete an existing job application using the company name and job title.",
      inputSchema: deleteJobApplicationInputSchema,
    },
    async ({ company, jobTitle }) => {
      try {
        const deletedApplication =
          await deleteJobApplication(company, jobTitle);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message:
                    `Job application for '${deletedApplication.jobTitle}' ` +
                    `at '${deletedApplication.company}' has been deleted successfully.`,
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
            : "An unexpected error occurred while deleting the job application.";

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