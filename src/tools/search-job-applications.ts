import { McpServer } from "@modelcontextprotocol/server";
import { searchJobApplicationsInputSchema } from "../schemas/search-job-applications.js";

export function SearchJobApplicationsTool(server: McpServer) {
  server.registerTool(
    "search_job_applications",
    {
      title: "Search Job Applications",
      description:
        "Search for job applications by company name, job title, or application status.",
      inputSchema: searchJobApplicationsInputSchema,
    },
    async ({ company, jobTitle, status }) => {
      // TODO: Read the saved job applications

      // TODO: Filter applications based on the provided fields

      // TODO: Return the matching results

      return {
        content: [
          {
            type: "text",
            text: "Search tool is not implemented yet.",
          },
        ],
      };
    }
  );
}