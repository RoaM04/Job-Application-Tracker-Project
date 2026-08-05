import { McpServer } from "@modelcontextprotocol/server";

import { removeJobApplicationNoteInputSchema } from "../schemas/remove-job-application-note.js";
import {
  readJobApplications,
  writeJobApplications,
} from "../lib/job-applications-file.js";

export function registerRemoveJobApplicationNoteTool(
  server: McpServer
): void {
  server.registerTool(
    "remove_job_application_note",
    {
      title: "Remove Job Application Note",
      description:
        "Remove a note from an existing job application using the company name and job title.",
      inputSchema: removeJobApplicationNoteInputSchema,
    },
    async ({ company, jobTitle, note }) => {
      try {
        const applications = await readJobApplications();

        const application = applications.find(
          (currentApplication) =>
            currentApplication.company.trim().toLowerCase() ===
              company.trim().toLowerCase() &&
            currentApplication.jobTitle.trim().toLowerCase() ===
              jobTitle.trim().toLowerCase()
        );

        if (!application) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Job application not found.",
              },
            ],
          };
        }

        const noteIndex = application.notes.findIndex(
          (currentNote) =>
            currentNote.trim().toLowerCase() ===
            note.trim().toLowerCase()
        );

        if (noteIndex === -1) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: "Note not found.",
              },
            ],
          };
        }

        application.notes.splice(noteIndex, 1);

        await writeJobApplications(applications);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: "Note removed successfully.",
                  company: application.company,
                  jobTitle: application.jobTitle,
                  removedNote: note,
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
              text:
                error instanceof Error
                  ? error.message
                  : "Failed to remove note.",
            },
          ],
        };
      }
    }
  );
}