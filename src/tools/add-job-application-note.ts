import { McpServer } from "@modelcontextprotocol/server";

import { addJobApplicationNoteInputSchema } from "../schemas/add-job-application-note.js";

export function registerAddJobApplicationNoteTool(server: McpServer) {
  server.registerTool(
    "add_job_application_note",
    {
      title: "Add Job Application Note",
      description: "Add a note or comment to an existing job application.",
      inputSchema: addJobApplicationNoteInputSchema,
    },
    async ({ company, jobTitle, note }) => {
      // TODO: Load the saved job applications.
      // TODO: Find the application using company and job title.
      // TODO: Add the new note to its notes array.
      // TODO: Save the updated applications.

      return {
        content: [
          {
            type: "text",
            text: `Note request received for "${jobTitle}" at "${company}": ${note}`,
          },
        ],
      };
    }
  );
}