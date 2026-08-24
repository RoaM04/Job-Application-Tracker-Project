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

        const normalizedCompany = company.trim().toLowerCase();
        const normalizedJobTitle = jobTitle.trim().toLowerCase();

        const matchingApplications = applications.filter(
          (application) =>
            application.company.trim().toLowerCase() ===
              normalizedCompany &&
            application.jobTitle.trim().toLowerCase() ===
              normalizedJobTitle
        );

        // No matching application
        if (matchingApplications.length === 0) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Job application for '${company.trim()}' at '${jobTitle.trim()}' was not found.`,
              },
            ],
          };
        }

        // Multiple matching applications
        if (matchingApplications.length > 1) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  "Multiple matching applications found. Update was not performed.",
              },
            ],
          };
        }

        // Exactly one matching application
        const application = matchingApplications[0];

        // Requested status is already the current status
        if (application.status === status) {
          return {
            content: [
              {
                type: "text",
                text: `Application is already in ${status} status. No update was performed.`,
              },
            ],
          };
        }

        // Allowed status transitions
        const allowedTransitions: Record<string, string[]> = {
          Applied: ["Interview"],
          Interview: ["Accepted", "Rejected"],
          Accepted: [],
          Rejected: [],
        };

        const allowedNextStatuses =
          allowedTransitions[application.status] ?? [];

        if (!allowedNextStatuses.includes(status)) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Invalid status transition from ${application.status} to ${status}.`,
              },
            ],
          };
        }

        // Update status
        application.status = status;

        await writeJobApplications(applications);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: "Application status updated successfully.",
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