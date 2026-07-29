import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerAddJobApplicationTool } from "./tools/add-job-application.js";
import { SearchJobApplicationsTool } from "./tools/search-job-applications.js";
import { registerDeleteJobApplicationTool } from "./tools/delete-job-application.js";
import { registerAddJobApplicationNoteTool } from "./tools/add-job-application-note.js";
import { registerRemoveJobApplicationNoteTool } from "./tools/remove-job-application-note.js";

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
  SearchJobApplicationsTool(server);
  registerDeleteJobApplicationTool(server);
  registerAddJobApplicationNoteTool(server);
  registerRemoveJobApplicationNoteTool(server);

  return server;
}

void serveStdio(createServer);

console.error("Job Application Tracker MCP server running on stdio");