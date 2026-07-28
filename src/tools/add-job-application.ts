import { McpServer } from "@modelcontextprotocol/server";

import { addJobApplicationInputSchema } from "../schemas/add-job-application.js";

export function registerAddJobApplicationTool(server: McpServer): void {
  server.registerTool(
    "add_job_application",
    {
      description:
        "Add a new job application to the Job Application Tracker.",
      inputSchema: addJobApplicationInputSchema,
    },
    async ({ company, jobTitle, applicationDate, applicationLink }) => {
      return {
        content: [
          {
            type: "text",
            text: `Job application added successfully.

Company: ${company}
Job Title: ${jobTitle}
Application Date: ${applicationDate}
Application Link: ${applicationLink}`,
          },
        ],
      };
    }
  );
}