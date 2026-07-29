import { McpServer } from "@modelcontextprotocol/server";
import { updateApplicationStatusInputSchema } from "../schemas/update-application-status.js";

export function registerUpdateApplicationStatusTool(
  server: McpServer
): void {
  server.registerTool(
    "update_application_status",
    {
      title: "Update Application Status",
      description:
        "Update the status of an existing job application using the company name and job title.",
      inputSchema: updateApplicationStatusInputSchema,
    },
    async ({ company, jobTitle, status }) => {
      return {
        content: [
          {
            type: "text",
            text: `The application for ${jobTitle} at ${company} was updated to ${status}.`,
          },
        ],
      };
    }
  );
}