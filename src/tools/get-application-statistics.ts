import { McpServer } from "@modelcontextprotocol/server";

import { getApplicationStatisticsInputSchema } from "../schemas/get-application-statistics.js";
import { readJobApplications } from "../lib/job-applications-file.js";

export function registerGetApplicationStatisticsTool(
  server: McpServer
): void {
  server.registerTool(
    "get_application_statistics",
    {
      title: "Get Application Statistics",
      description:
        "Generate a summary of job applications grouped by application status.",
      inputSchema: getApplicationStatisticsInputSchema,
    },
    async () => {
      try {
        const applications = await readJobApplications();

        const statistics = {
          total: applications.length,
          Applied: 0,
          Interview: 0,
          Accepted: 0,
          Rejected: 0,
        };

        for (const application of applications) {
          statistics[application.status]++;
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message:
                    "Application statistics generated successfully.",
                  statistics,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error(
          "[get_application_statistics] Failed:",
          error
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
             text: "Unable to generate application statistics. Please try again.",
            },
          ],
        };
      }
    }
  );
}