import { McpServer } from "@modelcontextprotocol/server";

import { updateJobApplicationDetailsInputSchema } from "../schemas/update-job-application-details.js";
import {
  readJobApplications,
  writeJobApplications,
} from "../lib/job-applications-file.js";

export function registerUpdateJobApplicationDetailsTool(
  server: McpServer
): void {
  server.registerTool(
    "update_job_application_details",
    {
      title: "Update Job Application Details",
      description:
        "Update the company, job title, application date, or application link of an existing job application.",
      inputSchema: updateJobApplicationDetailsInputSchema,
    },
    async ({
      company,
      jobTitle,
      newCompany,
      newJobTitle,
      newApplicationDate,
      newApplicationLink,
    }) => {
      try {
        const applications = await readJobApplications();

        const applicationIndex = applications.findIndex(
          (application) =>
            application.company.trim().toLowerCase() ===
              company.trim().toLowerCase() &&
            application.jobTitle.trim().toLowerCase() ===
              jobTitle.trim().toLowerCase()
        );

        if (applicationIndex === -1) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Job application not found.

Company: ${company}
Job Title: ${jobTitle}`,
              },
            ],
          };
        }

        if (
          !newCompany &&
          !newJobTitle &&
          !newApplicationDate &&
          !newApplicationLink
        ) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  "No new details were provided. Please provide at least one field to update.",
              },
            ],
          };
        }

        const currentApplication =
          applications[applicationIndex];

        const updatedApplication = {
          ...currentApplication,

          company:
            newCompany?.trim() ??
            currentApplication.company,

          jobTitle:
            newJobTitle?.trim() ??
            currentApplication.jobTitle,

          applicationDate:
            newApplicationDate ??
            currentApplication.applicationDate,

          applicationLink:
            newApplicationLink?.trim() ??
            currentApplication.applicationLink,
        };

        const duplicateApplication =
          applications.some(
            (application, index) =>
              index !== applicationIndex &&
              application.company
                .trim()
                .toLowerCase() ===
                updatedApplication.company
                  .trim()
                  .toLowerCase() &&
              application.jobTitle
                .trim()
                .toLowerCase() ===
                updatedApplication.jobTitle
                  .trim()
                  .toLowerCase()
          );

        if (duplicateApplication) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  "Another job application with the updated company and job title already exists.",
              },
            ],
          };
        }

        applications[applicationIndex] =
          updatedApplication;

        await writeJobApplications(applications);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message:
                    "Job application details updated successfully.",
                  application: updatedApplication,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error(
          "[update_job_application_details] Failed:",
          error
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Unable to update the job application details. Please try again.",
            },
          ],
        };
      }
    }
  );
}