# Threat Model — Job Application Tracker

## Assets

The main assets we need to protect are:

- `data/job-applications.json`, which stores all job application data.
- Job application information such as company name, job title, application date, status, notes, and application links.
- The local filesystem where the MCP server reads and writes data.
- MCP tool responses returned to the model/user.
- No API keys or authentication tokens are currently used in this project.

## Trust Boundaries

Untrusted input enters the system through MCP tool arguments.

Main trust boundaries:

- Model/User → MCP tool arguments.
- MCP tool → Zod input validation.
- MCP tools → `data/job-applications.json`.
- JSON file → application code when data is read and parsed.
- Tool → model/user through tool responses.

The project currently does not communicate with external APIs or networks.

## Top 5 Risks

### 1. Invalid or malicious tool input
A user or model could send empty, malformed, very long, or unexpected values to a tool.

### 2. Path traversal / unauthorized file access
If a file path becomes user-controlled, values such as `../` could be used to try to access files outside the project's `data` directory.

### 3. Malformed or corrupted JSON data
The `job-applications.json` file could become empty, malformed, or contain data that does not match the expected schema.

### 4. Large input or data file
Very large notes, fields, or a very large JSON file could cause slow processing or excessive memory usage.

### 5. File read/write failure
Reading or writing the JSON file may fail or take too long, which could crash a tool or leave the application in an unexpected state.

## Mitigations This Week

### Risk 1 — Input validation
Use Zod schemas to validate tool arguments. Required strings have minimum and maximum lengths, URLs are validated, dates follow `YYYY-MM-DD`, and status uses an allowlist:
`Applied`, `Interview`, `Accepted`, or `Rejected`.

### Risk 2 — Restrict filesystem access
Keep the data file path controlled by the application and do not accept arbitrary file paths from tool arguments. If file paths are added later, resolve and verify that they remain inside the allowed `data` directory.

### Risk 3 — Validate stored JSON
Parse the JSON safely and validate the loaded data using the `jobApplicationSchema`. Return a clean error instead of allowing invalid data to continue through the tools.

### Risk 4 — Size limits
Use maximum lengths in Zod schemas, such as 100 characters for company and job title and 500 characters for notes. Avoid returning unnecessarily large amounts of data from tools.

### Risk 5 — Safe file operations and timeout
Use `try/catch` around file operations and return clean error messages. File reading uses `readFileWithTimeout` with a timeout to prevent a tool from waiting indefinitely.

## Out of Scope

This is a student project running with a local JSON file, so production-level security is outside the current scope. We are not implementing user accounts, authentication, authorization, database encryption, cloud security, or external API security. These would be necessary if the project were deployed as a real multi-user production system.