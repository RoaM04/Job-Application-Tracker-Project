# Threat Model — Job Application Tracker

## Assets

- `data/job-applications.json`, which stores the job application records.
- Job application data such as company, job title, application date, application link, status, and notes.
- The machine's filesystem because the MCP server reads and writes a local file.
- MCP tool responses that return job application data.
- The project does not use API keys, authentication tokens, or external APIs.

## Trust Boundaries

- **Model → Tool arguments:** The model can send untrusted values such as company, job title, status, date, link, and notes.
- **Tool → Filesystem:** The MCP tools read from and write to `data/job-applications.json`.
- **Filesystem → Tool:** Data read from the JSON file must not be trusted until it is parsed and validated.
- **Tool → Model:** Tools return stored job application data back to the model.
- There is currently no **Tool → Network** boundary because the project does not use external APIs.

## Top 5 Risks

1. **Invalid tool arguments:** Tools such as `add_job_application` may receive empty, malformed, or excessively long company names, job titles, dates, links, or notes.

2. **Invalid application status:** `update_application_status` may receive a status outside the statuses supported by the project, resulting in inconsistent stored data.

3. **Corrupted or malformed data file:** `data/job-applications.json` may be empty, contain malformed JSON, or contain records that do not match the expected job application structure.

4. **Unintended filesystem access:** The MCP server has permission to read and write local files. File access should stay limited to the fixed `data/job-applications.json` file and tools should not accept user-controlled file paths.

5. **Runaway responses:** `list_job_applications` can return all stored applications. If the data file becomes large, the tool response could consume unnecessary memory and model context.

## Mitigations This Week

1. **Zod validation:** Validate MCP tool arguments using Zod before processing them. Required fields will reject empty values, dates must follow `YYYY-MM-DD`, application links must be valid URLs, and text fields have maximum lengths.

2. **Status allowlist:** Restrict application status with a Zod enum to only `Applied`, `Interview`, `Accepted`, and `Rejected`.

3. **Stored-data validation:** Parse `job-applications.json` safely and validate its records with the job application Zod schema before tools use the data. Malformed or invalid data will return a clean error.

4. **Filesystem protection and timeout:** Keep the data path fixed to `data/job-applications.json` instead of accepting a path from tool arguments. Use `readFileWithTimeout` and clean error handling for file operations.

5. **Response limits:** Add a reasonable record or response size limit to tools that can return large amounts of data, especially `list_job_applications`, to prevent runaway responses.

## Out of Scope

Authentication and authorization are not included because this is a local student project without user accounts. SSRF protection is not currently required because the MCP tools do not make network requests or fetch user-controlled URLs. Secret management is limited because the project currently uses no API keys or authentication tokens. Database security, encryption at rest, and cloud security are also out of scope because the project uses a local JSON file. These protections would need to be considered if the project were deployed as a real multi-user production system.
