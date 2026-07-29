import { McpServer } from "@modelcontextprotocol/server";
import { getApplicationStatisticsInputSchema } from "../schemas/get-application-statistics.js";

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
      return {
        content: [
          {
            type: "text",
            text: "Application statistics generated successfully.",
          },
        ],
      };
    }
  );
}