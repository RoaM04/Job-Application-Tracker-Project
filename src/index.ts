import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";


import { registerAddJobApplicationTool } from "./tools/add-job-application.js";

/**
 * Factory used by stdio (and later HTTP) so every connection gets a fresh server.
 * Register all tools inside this function — never on a shared global instance.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "job-application-tracker",
    version: "0.1.0",
  });

  // Week 2 tools
  registerAddJobApplicationTool(server);

  return server;
}

void serveStdio(createServer);

console.error("Job Application Tracker MCP server running on stdio");