# Threat Model — Job Application Tracker

## Assets

- `data/job-applications.json`, which stores the job application records.
- Job application data such as company, job title, application date, application link, status, and notes.
- The machine's filesystem because the MCP server reads and writes a local file.
- MCP tool responses that return job application data.
- The project does not use API keys, authentication tokens, or external APIs.

## Trust Boundaries

- Model → Tool arguments: the model can send untrusted values such as company, job title, status, date, link, and notes.
- Tool → Filesystem: the MCP tools read from and write to `data/job-applications.json`.
- Filesystem → Tool: data read from the JSON file must not be trusted until it is parsed and validated.
- Tool → Model: tools return stored job application data back to the model.
- There is currently no Tool → Network boundary because the project does not use external APIs.

## Top 5 Risks

1. **Invalid tool arguments:** Tools such as `add_job_application` may receive empty, malformed, or excessively long company names, job titles, dates, links, or notes.

2. **Invalid application status:** `update_application_status` may receive a status outside the statuses supported by the project, resulting in inconsistent stored data.

3. **Corrupted or malformed data file:** `data/job-applications.json` may be empty, contain malformed JSON, or contain records that do not match the expected job application structure.

4. **File operation timeout or failure:** A tool may take too long or fail while reading `job-applications.json`, preventing the MCP tool from completing normally.

5. **Excessive input size:** Large values, especially application notes and other text fields, could cause unnecessary storage or processing and make tool responses larger than expected.

## Mitigations This Week

1. **Zod validation:** Validate MCP tool arguments using Zod before processing them. Required fields will reject empty values, dates must follow `YYYY-MM-DD`, and application links must be valid URLs.

2. **Status allowlist:** Restrict application status with a Zod enum to only `Applied`, `Interview`, `Accepted`, and `Rejected`.

3. **Stored-data validation:** Parse `job-applications.json` safely and validate its records with the job application Zod schema before tools use the data. Malformed or invalid data will return a clean error.

4. **Read timeout and error handling:** Use `readFileWithTimeout` when reading the local data file and handle file errors with `try/catch` so tools return a clean error instead of waiting indefinitely or crashing.

5. **Size caps:** Apply maximum lengths to user-controlled text fields. For example, company and job title are limited to 100 characters and notes are limited to 500 characters.

## Out of Scope

Authentication and authorization are not included because this is a local student project without user accounts. Database security, encryption at rest, cloud security, and external API security are also out of scope because the project uses a local JSON file and does not communicate with external APIs. These protections would need to be considered if the project were deployed as a real multi-user production system.