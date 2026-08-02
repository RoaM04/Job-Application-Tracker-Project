import { McpServer } from "@modelcontextprotocol/server";

import { addJobApplicationNoteInputSchema } from "../schemas/add-job-application-note.js";
import {
  readJobApplications,
  writeJobApplications,
} from "../lib/job-applications-file.js";

export function registerAddJobApplicationNoteTool(
  server: McpServer
): void {
  server.registerTool(
    "add_job_application_note",
    {
      title: "Add Job Application Note",
      description:
        "Add a note to an existing job application using the company name and job title.",
      inputSchema: addJobApplicationNoteInputSchema,
    },
    async ({ company, jobTitle, note }) => {
      try {
        const applications = await readJobApplications();

        const application = applications.find(
          (currentApplication) =>
            currentApplication.company
              .trim()
              .toLowerCase() ===
              company.trim().toLowerCase() &&
            currentApplication.jobTitle
              .trim()
              .toLowerCase() ===
              jobTitle.trim().toLowerCase()
        );

        if (!application) {
          throw new Error(
            `No job application was found for ${company} - ${jobTitle}.`
          );
        }

        const trimmedNote = note.trim();

        application.notes.push(trimmedNote);

        await writeJobApplications(applications);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: "Note added successfully.",
                  company: application.company,
                  jobTitle: application.jobTitle,
                  note: trimmedNote,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unable to add the note.",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    }
  );
}