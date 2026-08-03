import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerAddJobApplicationTool } from "./tools/add-job-application.js";
import { registerSearchJobApplicationsTool } from "./tools/search-job-applications.js";
import { registerDeleteJobApplicationTool } from "./tools/delete-job-application.js";
//import { registerAddJobApplicationNoteTool } from "./tools/add-job-application-note.js";
import { registerUpdateApplicationStatusTool } from "./tools/update-application-status.js";
//import { registerListJobApplicationsTool } from "./tools/list-job-applications.js";
import { registerGetApplicationStatisticsTool } from "./tools/get-application-statistics.js";
import { registerUpdateJobApplicationDetailsTool } from "./tools/update-job-application-details.js";
import { registerMarkApplicationAsFavoriteTool } from "./tools/mark-application-as-favorite.js";
import { registerGetJobApplicationDetailsTool } from "./tools/get-job-application-details.js";

/**
 * Factory used by stdio so every connection gets a fresh server.
 * Register all tools inside this function.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "job-application-tracker",
    version: "0.1.0",
  });

  registerAddJobApplicationTool(server);
  registerSearchJobApplicationsTool(server);
  registerDeleteJobApplicationTool(server);
 // registerAddJobApplicationNoteTool(server);
  registerUpdateApplicationStatusTool(server);
 // registerListJobApplicationsTool(server);
  registerGetApplicationStatisticsTool(server);
  registerUpdateJobApplicationDetailsTool(server);
  registerMarkApplicationAsFavoriteTool(server);
  registerGetJobApplicationDetailsTool(server);
  


  return server;
}

void serveStdio(createServer);

console.error("Job Application Tracker MCP server running on stdio");