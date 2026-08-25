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
        "Remove a note from an existing job application using the company name and job title. If multiple applications match, removal is refused to prevent ambiguous changes.",
      inputSchema: removeJobApplicationNoteInputSchema,
    },
    async ({ company, jobTitle, note }) => {
      try {
        const applications = await readJobApplications();

        const matchingApplications = applications.filter(
          (currentApplication) =>
            currentApplication.company.trim().toLowerCase() ===
              company.trim().toLowerCase() &&
            currentApplication.jobTitle.trim().toLowerCase() ===
              jobTitle.trim().toLowerCase()
        );

        if (matchingApplications.length === 0) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `Remove failed: no job application was found for '${jobTitle}' at '${company}'. No data was changed.`,
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
                text:
                  "Remove failed: multiple matching job applications were found. The note was not removed to prevent an ambiguous change.",
              },
            ],
          };
        }

        const application = matchingApplications[0];

        const trimmedNote = note.trim();

        const noteIndex = application.notes.findIndex(
          (currentNote) =>
            currentNote.trim().toLowerCase() ===
            trimmedNote.toLowerCase()
        );

        if (noteIndex === -1) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text:
                  "Remove failed: the specified note was not found. No data was changed.",
              },
            ],
          };
        }

        const removedNote = application.notes[noteIndex];

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
                  removedNote,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error(
          "Remove job application note failed:",
          error
        );

        return {
          isError: true,
          content: [
            {
              type: "text",
              text:
                error instanceof Error
                  ? `Remove failed: ${error.message}`
                  : "Remove failed: unable to remove the note.",
            },
          ],
        };
      }
    }
  );
}