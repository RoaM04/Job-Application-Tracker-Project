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
        "Delete a saved job application using the company name and job title.",
      inputSchema: deleteJobApplicationInputSchema,
    },
    async ({ company, jobTitle }) => {
      try {
        const applications = await readJobApplications();

        const applicationIndex = applications.findIndex(
          (application) =>
            application.company.toLowerCase() ===
              company.trim().toLowerCase() &&
            application.jobTitle.toLowerCase() ===
              jobTitle.trim().toLowerCase()
        );

        if (applicationIndex === -1) {
          return {
            isError: true,
            content: [
            {
              type: "text",
              text: "No matching job application was found.",
      },
    ],
  };
}

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
                  message:
                    "Job application deleted successfully.",
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
        const message =
          error instanceof Error
            ? error.message
            : "Unable to delete the job application.";

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: message,
            },
          ],
        };
      }
    }
  );
}