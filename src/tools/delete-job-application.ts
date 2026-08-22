import { McpServer } from "@modelcontextprotocol/server";

import { deleteJobApplicationInputSchema } from "../schemas/delete-job-application.js";
import {
  readJobApplications,
  writeJobApplications,
} from "../lib/job-applications-file.js";

export function registerDeleteJobApplicationTool(
  server: McpServer
): void {
  server.registerTool(
    "delete_job_application",
    {
      title: "Delete Job Application",
      description:
        "Delete a saved job application using the company name and job title. Deletion requires explicit confirmation. If multiple applications match, deletion is refused to prevent ambiguous deletion.",
      inputSchema: deleteJobApplicationInputSchema,
    },
    async ({ company, jobTitle, confirm }) => {
      try {
        if (!confirm) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Deletion was not performed. Explicit confirmation is required.",
              },
            ],
          };
        }

        const applications = await readJobApplications();

        const matchingApplications = applications
          .map((application, index) => ({
            application,
            index,
          }))
          .filter(
            ({ application }) =>
              application.company.trim().toLowerCase() ===
                company.trim().toLowerCase() &&
              application.jobTitle.trim().toLowerCase() ===
                jobTitle.trim().toLowerCase()
          );

        if (matchingApplications.length === 0) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `No job application was found for '${jobTitle}' at '${company}'.`,
              },
            ],
          };
        }

        if (matchingApplications.length > 1) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Multiple matching job applications were found. Delete was not performed.",
              },
            ],
          };
        }

        const applicationIndex = matchingApplications[0].index;

        const [deletedApplication] = applications.splice(
          applicationIndex,
          1
        );

        await writeJobApplications(applications);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: "Job application deleted successfully.",
                  company: deletedApplication.company,
                  jobTitle: deletedApplication.jobTitle,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Delete job application failed:", error);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Unable to delete the job application.",
            },
          ],
        };
      }
    }
  );
}