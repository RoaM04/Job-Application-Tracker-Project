import { McpServer } from "@modelcontextprotocol/server";

import { addJobApplicationInputSchema } from "../schemas/add-job-application.js";
import {
  readJobApplications,
  writeJobApplications,
} from "../lib/job-applications-file.js";

export function registerAddJobApplicationTool(
  server: McpServer
): void {
  server.registerTool(
    "add_job_application",
    {
      description:
        "Add a new job application to the Job Application Tracker.",
      inputSchema: addJobApplicationInputSchema,
    },
    async ({
      company,
      jobTitle,
      applicationDate,
      applicationLink,
    }) => {
      try {
        const applications =
          await readJobApplications();

        const normalizedCompany =
          company.trim();

        const normalizedJobTitle =
          jobTitle.trim();

        const duplicateApplication =
          applications.find(
            (application) =>
              application.company
                .trim()
                .toLowerCase() ===
                normalizedCompany.toLowerCase() &&
              application.jobTitle
                .trim()
                .toLowerCase() ===
                normalizedJobTitle.toLowerCase()
          );

        if (duplicateApplication) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `A job application already exists.

Company: ${normalizedCompany}
Job Title: ${normalizedJobTitle}`,
              },
            ],
          };
        }

        const newApplication = {
          company: normalizedCompany,
          jobTitle: normalizedJobTitle,
          applicationDate,
          applicationLink:
            applicationLink.trim(),
          status: "Applied" as const,
          notes: [],
        };

        applications.push(newApplication);

        await writeJobApplications(
          applications
        );

        return {
          content: [
            {
              type: "text",
              text: `Job application added successfully.

Company: ${newApplication.company}
Job Title: ${newApplication.jobTitle}
Application Date: ${newApplication.applicationDate}
Application Link: ${newApplication.applicationLink}
Status: ${newApplication.status}`,
            },
          ],
        };
      }  catch (error) {
  console.error(
    "[add_job_application] Failed:",
    error
  );

  return {
    isError: true,
    content: [
      {
        type: "text",
        text: "Unable to add the job application. Please try again.",
      },
    ],
  };
}
    }
  );
}