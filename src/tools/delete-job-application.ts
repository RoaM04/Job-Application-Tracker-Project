import { McpServer } from "@modelcontextprotocol/server";

import { deleteJobApplicationInputSchema } from "../schemas/delete-job-application.js";

export function registerDeleteJobApplicationTool(server: McpServer) {
  server.registerTool(
    "delete_job_application",
    {
      title: "Delete Job Application",
      description:
        "Delete an existing job application using its identifying information.",
      inputSchema: deleteJobApplicationInputSchema,
    },
    async (input) => {
      const { company, jobTitle } = input;

      // TODO: Load job applications
      // TODO: Find the matching application
      // TODO: Delete the application
      // TODO: Save the updated list

      return {
        content: [
          {
            type: "text",
            text: `Job application for "${jobTitle}" at "${company}" has been deleted successfully.`,
          },
        ],
      };
    }
  );
}