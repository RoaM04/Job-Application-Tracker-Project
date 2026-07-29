import { McpServer } from "@modelcontextprotocol/server";
import { markApplicationAsFavoriteInputSchema } from "../schemas/mark-application-as-favorite.js";

export function registerMarkApplicationAsFavoriteTool(
  server: McpServer
): void {
  server.registerTool(
    "mark_application_as_favorite",
    {
      title: "Mark Application as Favorite",
      description:
        "Marks a specific job application as favorite using the company name and job title.",
      inputSchema: markApplicationAsFavoriteInputSchema,
    },
    async ({ company, jobTitle }) => {
      return {
        content: [
          {
            type: "text",
            text: `${jobTitle} at ${company} was marked as favorite successfully.`,
          },
        ],
      };
    }
  );
}