import { McpServer } from "@modelcontextprotocol/server";

import { addJobApplicationNoteInputSchema } from "../schemas/add-job-application-note.js";
import { addJobApplicationNote } from "../lib/job-applications.js";

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
        const updatedApplication =
          await addJobApplicationNote(
            company,
            jobTitle,
            note
          );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  message: "Note added successfully.",
                  company: updatedApplication.company,
                  jobTitle: updatedApplication.jobTitle,
                  note,
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