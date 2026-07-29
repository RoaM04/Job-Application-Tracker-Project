import { McpServer } from "@modelcontextprotocol/server";
import { updateJobApplicationDetailsInputSchema } from "../schemas/update-job-application-details.js";

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
      const updatedFields = [
        newCompany ? `company to ${newCompany}` : null,
        newJobTitle ? `job title to ${newJobTitle}` : null,
        newApplicationDate
          ? `application date to ${newApplicationDate}`
          : null,
        newApplicationLink
          ? `application link to ${newApplicationLink}`
          : null,
      ].filter(Boolean);

      return {
        content: [
          {
            type: "text",
            text:
              updatedFields.length > 0
                ? `Job application for ${jobTitle} at ${company} was updated: ${updatedFields.join(", ")}.`
                : `No new details were provided for the job application at ${company}.`,
          },
        ],
      };
    }
  );
}