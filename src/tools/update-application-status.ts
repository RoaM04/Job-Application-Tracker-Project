import { McpServer } from "@modelcontextprotocol/server";

import { updateApplicationStatusInputSchema } from "../schemas/update-application-status.js";

import {
  readJobApplications,
  writeJobApplications,
} from "../lib/job-applications-file.js";

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
      try {
        const applications = await readJobApplications();

        const application = applications.find(
          (application) =>
            application.company.trim().toLowerCase() ===
              company.trim().toLowerCase() &&
            application.jobTitle.trim().toLowerCase() ===
              jobTitle.trim().toLowerCase()
        );

        if (!application) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Job application for '${jobTitle}' at '${company}' was not found.`,
              },
            ],
          };
        }

        application.status = status;

        await writeJobApplications(applications);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message:
                    "Application status updated successfully.",
                  company: application.company,
                  jobTitle: application.jobTitle,
                  status: application.status,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error(
          "[update_application_status] Failed:",
          error
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Failed to update the application status.",
            },
          ],
        };
      }
    }
  );
}