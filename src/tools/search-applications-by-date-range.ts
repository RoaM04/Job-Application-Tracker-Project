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
        // Validate that the dates are real calendar dates
        const parsedStartDate = new Date(`${startDate}T00:00:00Z`);
        const parsedEndDate = new Date(`${endDate}T00:00:00Z`);

        if (
          isNaN(parsedStartDate.getTime()) ||
          parsedStartDate.toISOString().slice(0, 10) !== startDate
        ) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Invalid start date. Please use a valid date in YYYY-MM-DD format.",
              },
            ],
          };
        }

        if (
          isNaN(parsedEndDate.getTime()) ||
          parsedEndDate.toISOString().slice(0, 10) !== endDate
        ) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Invalid end date. Please use a valid date in YYYY-MM-DD format.",
              },
            ],
          };
        }

        // Validate date range
        if (startDate > endDate) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Start date must be before or equal to end date.",
              },
            ],
          };
        }

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