import { McpServer } from "@modelcontextprotocol/server";

import { searchApplicationsByDateRangeInputSchema } from "../schemas/search-applications-by-date-range.js";
import { readJobApplications } from "../lib/job-applications-file.js";

export function registerSearchApplicationsByDateRangeTool(
  server: McpServer
): void {
  server.registerTool(
    "search_applications_by_date_range",
    {
      title: "Search Applications by Date Range",
      description:
        "Search job applications submitted between two dates.",
      inputSchema:
        searchApplicationsByDateRangeInputSchema,
    },
    async ({ startDate, endDate }) => {
      try {
        const applications =
          await readJobApplications();

        const results = applications.filter(
          (application) =>
            application.applicationDate >= startDate &&
            application.applicationDate <= endDate
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total: results.length,
                  applications: results,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to search applications by date range.",
            },
          ],
        };
      }
    }
  );
}