# Job Application Tracker MCP

A local Model Context Protocol (MCP) server for managing job applications. The server allows an AI assistant to add, delete, search, update, and manage job application data stored in a local JSON file.

The project works offline and does not require paid APIs or authentication.

## Requirements

Before running the project, make sure you have:

* Node.js 20 or later
* npm
* Git
* VS Code or another code editor
* MCP Inspector for testing the server

Check your Node.js and npm versions:

```bash
node -v
npm -v
```

## Install

Clone the repository:

```bash
git clone https://github.com/RoaM04/Job-Application-Tracker-Project.git
```

Move into the project folder:

```bash
cd Job-Application-Tracker-Project
```

Install the dependencies:

```bash
npm install
```

## Run

Start the MCP server with:

```bash
npm run dev
```

The server runs using the stdio transport and waits for MCP requests.

You should see:

```text
Job Application Tracker MCP server running on stdio
```

Keep the terminal running while using MCP Inspector.

## Web Interface

A small web UI is also included for browsing job applications outside of an AI assistant.

Serve the static frontend (folder: `public/`):

```bash
npx serve public -p 3000
```

Start the backend web server:

```bash
node web/server.js
```

Once both are running, open `http://localhost:3000` in your browser.

> Note: run each command in its own terminal tab, and keep both running at the same time. Update the port number above if `3000` is already in use on your machine.

## MCP Inspector

To test the server with MCP Inspector, run:

```bash
npm run inspect
```

Open the Inspector interface, connect to the server, and select **Tools**.

Choose one of the available tools and provide the required input.

The project stores its data in:

```text
data/job-applications.json
```

The `examples/` directory contains example JSON inputs that can be reused when testing tools.

## Tools

| Tool                                | Description                                                    |
| ------------------------------------ | --------------------------------------------------------------- |
| `add_job_application`               | Adds a new job application to the local JSON data file.        |
| `delete_job_application`            | Deletes an existing job application after confirmation.        |
| `update_application_status`         | Updates the status of an existing job application.             |
| `search_job_applications`           | Searches job applications using the available search criteria. |
| `add_job_application_note`          | Adds a note to an existing job application.                    |
| `remove_job_application_note`       | Removes a note from an existing job application.               |
| `list_job_applications`             | Lists stored job applications.                                 |
| `get_application_statistics`        | Returns statistics about the stored job applications.          |
| `update_job_application_details`    | Updates details of an existing job application.                |
| `get_job_application_details`       | Retrieves full details of job applications by company, job title, or both.              |
| `search_applications_by_date_range` | Searches applications within a specified date range.           |

All application data is stored locally in:

```text
data/job-applications.json
```

No external API or authentication is required.

## Example Prompts

These are examples of requests that can be used with an AI assistant connected to the MCP server:

```text
Add a job application for Google for a Software Engineer position.
```

```text
Delete my Google Software Engineer application.
```

```text
Update the status of my Google Software Engineer application to Interview.
```

```text
Show me my job applications.
```

```text
Search for job applications at Google.
```

```text
Add a note to my Google Software Engineer application.
```

```text
Show me statistics about my job applications.
```

The exact input fields required by each tool can also be checked in MCP Inspector.

## Connect to Claude Desktop

Inspector is great for development, but for Demo Day (or everyday use) you can connect this server directly to Claude Desktop so Claude can call the tools itself. This project uses a local **stdio** server, so it's added through Claude Desktop's config file — not through Claude.ai "Connectors" in the browser, which are for remote/HTTP servers.

### 1. Prerequisites

* Claude Desktop installed and updated: [claude.ai/download](https://claude.ai/download) (macOS or Windows).
* Node 20+ on your PATH — check with `node -v` and `npx -v`.
* The server already runs in Inspector via `npx tsx src/index.ts` (or `npm run dev`) from the repo root.
* The server logs only to stderr (`console.error`), never `console.log` to stdout, since stdio transport owns stdout.

### 2. Open Claude's MCP config

In Claude Desktop: menu bar **Claude → Settings… → Developer → Edit Config**.

This opens (or creates):

* macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
* Windows: `%APPDATA%\Claude\claude_desktop_config.json`

If other MCP servers are already listed there, add this one alongside them — don't remove existing entries.

### 3. Add this server

Replace the `cwd` path below with the absolute path to your local clone of this repo. `cwd` must be absolute so `./data` fixtures resolve correctly (Claude does not start inside this folder).

**macOS:**

```json
{
  "mcpServers": {
    "Job-Application-Tracker-Project": {
      "command": "npx",
      "args": ["-y", "tsx", "src/index.ts"],
      "cwd": "/Users/YOUR_MAC_USERNAME/path/to/Job-Application-Tracker-Project"
    }
  }
}
```

**Windows:** use `npx.cmd` (plain `npx` often fails), and double any backslashes in the JSON:

```json
{
  "mcpServers": {
    "Job-Application-Tracker-Project": {
      "command": "npx.cmd",
      "args": ["-y", "tsx", "src/index.ts"],
      "cwd": "C:\\Users\\YOUR_WINDOWS_USERNAME\\path\\to\\Job-Application-Tracker-Project"
    }
  }
}
```

If `npx` / `npx.cmd` shows up as "not found," put the full path from `which npx` (macOS) or `where npx` (Windows) in `command` instead.

Make sure the file is valid JSON (no trailing commas, no comments), then save it.

### 4. Fully restart Claude Desktop

Quit the app completely — macOS: **Claude menu → Quit Claude**, not just closing the window — then reopen it. The config is only read at startup.

### 5. Confirm the tools loaded

In a new chat, open the tools/connectors panel next to the message box (**Manage connectors**, or the hammer/tools icon). You should see `Job-Application-Tracker-Project` and its tools listed.

Try one of the [Example Prompts](#example-prompts) above and approve the tool call when Claude asks. If Claude picks the wrong tool, tighten that tool's description in the code and restart Claude Desktop.

### 6. If the server doesn't appear — debug in this order

* Confirm `cwd` is an absolute, existing folder (the repo root, not `src/`).
* From that same folder, manually run `npx -y tsx src/index.ts`. It should sit waiting on stdio with no crash — stop it with `Ctrl+C`.
* Check Claude's MCP logs:
  * macOS: `~/Library/Logs/Claude/mcp.log` and `mcp-server-Job-Application-Tracker-Project.log`
  * Windows: `%APPDATA%\Claude\logs\`
* PATH issues: Claude Desktop does not load your shell profile, so use a full path to `npx`/`node` if needed.
* Still stuck: copy the exact error from the log and use MCP Inspector as a fallback for testing/demoing.

## Troubleshooting

### 1. `npm install` fails

Make sure Node.js 20 or later is installed:

```bash
node -v
```

If Node.js is missing or the version is too old, install a supported version and run:

```bash
npm install
```

again.

### 2. MCP Inspector cannot connect to the server

Make sure you are running the command from the project root:

```bash
npm run inspect
```

Also make sure there are no TypeScript or dependency errors in the terminal.

If the server is already running separately with `npm run dev`, stop it before starting Inspector if both commands try to use the same server process.

### 3. A tool cannot find or update an application

Check that:

```text
data/job-applications.json
```

exists and contains valid JSON data.

For tests, restore the fixture data before trying another operation. Also make sure the company name and job title match an existing application.

## License

MIT License.