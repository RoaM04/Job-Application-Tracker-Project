import { McpServer } from "@modelcontextprotocol/server";
import { listJobApplicationsInputSchema } from "../schemas/list-job-applications.js";
import { readJobApplications } from "../lib/job-applications-file.js";

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
      try {
        const applications = await readJobApplications();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total: applications.length,
                  applications,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error(
          "[list_job_applications] Failed:",
          error
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to read job applications.",
            },
          ],
        };
      }
    }
  );
}