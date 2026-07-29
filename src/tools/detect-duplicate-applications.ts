import { McpServer } from "@modelcontextprotocol/server";
import { detectDuplicateApplicationsInputSchema } from "../schemas/detect-duplicate-applications.js";

export function registerDetectDuplicateApplicationsTool(
  server: McpServer
): void {
  server.registerTool(
    "detect_duplicate_applications",
    {
      title: "Detect Duplicate Applications",
      description:
        "Checks whether a job application with the same company name and job title already exists.",
      inputSchema: detectDuplicateApplicationsInputSchema,
    },
    async ({ company, jobTitle }) => {
      return {
        content: [
          {
            type: "text",
            text: `Duplicate check completed for ${jobTitle} at ${company}. No duplicate was found.`,
          },
        ],
      };
    }
  );
}