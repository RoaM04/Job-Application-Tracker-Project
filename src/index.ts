import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerDeleteJobApplicationTool } from "./tools/delete-job-application.js";
import { registerAddJobApplicationNoteTool } from "./tools/add-job-application-note.js";
import { registerRemoveJobApplicationNoteTool } from "./tools/remove-job-application-note.js";

function createServer(): McpServer {
  const server = new McpServer({
    name: "mcprepo",
    version: "0.1.0",
  });


  registerDeleteJobApplicationTool(server);
  registerAddJobApplicationNoteTool(server);
  registerRemoveJobApplicationNoteTool(server);

  return server;
}

void serveStdio(createServer);
console.error("mcprepo MCP server running on stdio");