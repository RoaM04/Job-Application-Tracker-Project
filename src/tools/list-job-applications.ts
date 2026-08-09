import { McpServer } from "@modelcontextprotocol/server";
import { listJobApplicationsInputSchema } from "../schemas/list-job-applications.js";
import { readJobApplications } from "../lib/job-applications-file.js";

const MAX_RESULTS = 50;

export function registerListJobApplicationsTool(
  server: McpServer
): void {
  server.registerTool(
    "list_job_applications",
    {
      title: "List Job Applications",
      description: "List saved job applications.",
      inputSchema: listJobApplicationsInputSchema,
    },
    async () => {
      try {
        const applications = await readJobApplications();

        const limitedApplications = applications.slice(
          0,
          MAX_RESULTS
        );

        const hasMore =
          applications.length > MAX_RESULTS;

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  total: applications.length,
                  returned: limitedApplications.length,
                  hasMore,
                  message: hasMore
                    ? `Showing the first ${MAX_RESULTS} applications. More applications are available.`
                    : "All applications are shown.",
                  applications: limitedApplications,
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
                  : "Failed to read job applications.",
            },
          ],
        };
      }
    }
  );
}