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
        "Delete a saved job application using the company name and job title. Deletion requires explicit confirmation. If multiple applications match, deletion is refused and the matching applications are returned.",
      inputSchema: deleteJobApplicationInputSchema,
    },
    async ({ company, jobTitle, confirm }) => {
      // Missing required fields
      if (!company?.trim() || !jobTitle?.trim()) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Deletion failed: company and job title are required.",
            },
          ],
        };
      }

      // Confirmation check
      if (!confirm) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                "Deletion was not performed. Explicit confirmation is required.",
            },
          ],
        };
      }

      let applications;

      // Read and validate the data file
      try {
        applications = await readJobApplications();
      } catch (error) {
        console.error("Failed to read job applications:", error);

        const message =
          error instanceof Error ? error.message.toLowerCase() : "";

        if (
          message.includes("enoent") ||
          message.includes("no such file") ||
          message.includes("not found")
        ) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  "Deletion failed: the job applications data file was not found.",
              },
            ],
          };
        }

        if (
          message.includes("json") ||
          message.includes("unexpected token") ||
          message.includes("parse")
        ) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  "Deletion failed: the job applications data file contains malformed JSON.",
              },
            ],
          };
        }

        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                "Deletion failed: unable to read the job applications data file.",
            },
          ],
        };
      }

      // Empty file / empty data
      if (!applications || applications.length === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                "Deletion failed: the job applications data file is empty. No applications are available to delete.",
            },
          ],
        };
      }

      // Find matching applications
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

      // Application not found
      if (matchingApplications.length === 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Deletion failed: no job application was found for '${jobTitle}' at '${company}'. No data was changed.`,
            },
          ],
        };
      }

      // Duplicate applications
      if (matchingApplications.length > 1) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message:
                    "Deletion failed: multiple matching job applications were found. No application was deleted to prevent ambiguous deletion.",
                  matches: matchingApplications.map(
                    ({ application }) => ({
                      company: application.company,
                      jobTitle: application.jobTitle,
                      status: application.status,
                    })
                  ),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Exactly one match
      const applicationIndex = matchingApplications[0].index;
      const deletedApplication = applications[applicationIndex];

      const updatedApplications = applications.filter(
        (_, index) => index !== applicationIndex
      );

      // Write updated data
      try {
        await writeJobApplications(updatedApplications);
      } catch (error) {
        console.error("Failed to write job applications:", error);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                "Deletion failed: the job applications file could not be updated. The application was not deleted.",
            },
          ],
        };
      }

      // Success
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
    }
  );
}