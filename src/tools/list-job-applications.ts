import { McpServer } from "@modelcontextprotocol/server";
import { listJobApplicationsInputSchema } from "../schemas/list-job-applications.js";

export function registerListJobApplicationsTool(
  server: McpServer
): void {
  server.registerTool(
    "list_job_applications",
    {
      title: "List Job Applications",
      description: "List all saved job applications.",
      inputSchema: listJobApplicationsInputSchema,
    },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "Listing all job applications (stub).",
          },
        ],
      };
    }
  );
}