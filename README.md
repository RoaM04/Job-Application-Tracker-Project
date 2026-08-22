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
| ----------------------------------- | -------------------------------------------------------------- |
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
