import { McpServer } from "@modelcontextprotocol/server";

import { removeJobApplicationNoteInputSchema } from "../schemas/remove-job-application-note.js";

export function registerRemoveJobApplicationNoteTool(server: McpServer) {
  server.registerTool(
    "remove_job_application_note",
    {
      title: "Remove Job Application Note",
      description: "Remove a specific note from an existing job application.",
      inputSchema: removeJobApplicationNoteInputSchema,
    },
    async ({ company, jobTitle, note }) => {
      // TODO: Load saved job applications.
      // TODO: Find the application using company and job title.
      // TODO: Find the exact note.
      // TODO: Remove the note.
      // TODO: Save the updated applications.

      return {
        content: [
          {
            type: "text",
            text: `Remove note request received for "${jobTitle}" at "${company}": ${note}`,
          },
        ],
      };
    }
  );
}