# Week 4 On-site Peer Review Checklist

## Project

**Job Application Tracker MCP Server**

## P0 Tool Reviewed

`delete_job_application`

## Peer Reviewers

* **Marwa**
* **Shaymaa**

---

# Peer Review 1 — Marwa

## Review Areas

The peer review covered:

* Schemas and validation
* Error handling
* Secrets
* Data and file access restrictions
* README and demo path
* `SECURITY.md`
* MCP Inspector testing
* Ambiguous deletion attack scenario

## What Worked Well

1. The input schema requires both `company` and `jobTitle`.
2. Both inputs are trimmed and limited to 100 characters.
3. Empty company names and job titles are rejected by the schema.
4. Company names and job titles are matched case-insensitively.
5. The tool safely handles cases where no matching application is found.
6. The tool checks for multiple matching applications before deleting.
7. When multiple applications have the same company and job title, deletion is refused instead of deleting the first match.
8. The ambiguous-match protection helps prevent unintended deletion during a destructive operation.
9. Unexpected errors are logged server-side using `console.error`.
10. The model receives a short generic error message instead of a raw stack trace or internal error details.
11. The tool uses the shared `readJobApplications` and `writeJobApplications` helpers for file operations.
12. No hard-coded secrets or credentials were identified in the reviewed delete tool or `SECURITY.md`.
13. The tool does not accept an arbitrary file path from the user.
14. The README provides a clear path for running the MCP server and testing `delete_job_application` through MCP Inspector.

## Security / Threat-Model Review

### Schemas

The schema validates the required `company` and `jobTitle` fields, trims the inputs, applies maximum length limits, and now requires an explicit boolean confirmation before deletion.

### Error Handling

The tool handles missing applications and ambiguous matches with short and actionable messages. Unexpected errors are logged internally while the model receives a safe generic message.

The "not found" response was improved based on peer feedback so that it identifies the requested company and job title.

### Secrets

No hard-coded secrets or credentials were identified in the reviewed delete tool or `SECURITY.md`.

### Data Access / File Restrictions

The delete tool does not accept an arbitrary file path as user input and relies on the shared application-data helpers for file operations.

### README / Documentation

The README provides a clear path for running the MCP server and testing the delete tool through MCP Inspector. The tool description was also improved to explain that deletion requires explicit confirmation and that ambiguous matches are refused.

## Security Test / Attack Scenario

An ambiguous deletion scenario was tested where multiple applications had the same company and job title.

The tool correctly returned:

> "Multiple matching job applications were found. Delete was not performed."

No application was deleted.

The behavior was confirmed as:

* No match → deletion is refused.
* One match → deletion proceeds when confirmation is provided.
* Multiple matches → deletion is refused, even when confirmation is provided.

This protection prevents the tool from automatically deleting the first application when the request is ambiguous.

## Issues / Findings

No P0/must-fix security issues were identified.

The tool identifies applications using `company` and `jobTitle`. If multiple applications have the same values, deletion is safely refused, but the user cannot specify which application to delete.

## Recommended Improvement

Marwa recommended adding a unique application ID in the future so the user can specify exactly which application to delete when multiple applications share the same company and job title.

This recommendation was documented as a **future improvement** and was not implemented during this review cycle.

---

# Peer Review 2 — Shaymaa

## What Worked Well

1. The input schema validates that `company` and `jobTitle` are required and limits them to 100 characters.
2. Inputs are trimmed and matched case-insensitively.
3. The tool safely handles cases where no matching application is found.
4. The tool correctly detects multiple matching applications and refuses to delete when the request is ambiguous.
5. Errors returned to the user do not expose internal stack traces or sensitive implementation details.
6. The application is only removed after exactly one matching application has been identified.
7. The duplicate-match protection prevents an ambiguous request from deleting the wrong application.

## Issues Found

No P0/must-fix security issues were identified during the review.

## Recommended Improvements and Actions Taken

### 1. Explicit Confirmation Before Deletion

**Peer recommendation:** Add an explicit confirmation step before permanently deleting an application.

**Action taken:** Implemented.

The delete input schema now requires a `confirm` boolean. The deletion operation only proceeds when `confirm: true`.

If confirmation is not provided or is false, the tool returns:

> "Deletion was not performed. Explicit confirmation is required."

The existing multiple-match protection remains in place.

### 2. Error Message Clarity

**Peer recommendation:** Make the "not found" message more actionable by including the company and job title.

**Action taken:** Implemented.

The message was changed to include the requested application details:

> "No job application was found for 'Software Engineer' at 'Google'."

### 3. Tool Description

**Peer recommendation:** Update the tool description to explain the duplicate-match and confirmation behavior.

**Action taken:** Implemented.

The tool description now explains that deletion requires explicit confirmation and that deletion is refused when multiple applications match.

## Suggested Tests

The following test cases were reviewed or recommended:

* Empty company or job title
* Input longer than 100 characters
* Non-existing application
* Case-insensitive company/job title matching
* Multiple applications with the same company and job title
* Attempting deletion without confirmation
* Successful deletion with confirmation
* Confirming deletion when multiple matches exist

---

# Action Items

| Action Item                                      | Owner                        | Due Date           | Status    |
| ------------------------------------------------ | ---------------------------- | ------------------ | --------- |
| Review both peer feedback reports                | Job Application Tracker Team | End of Week 4      | Completed |
| Verify schema validation and input limits        | Job Application Tracker Team | End of Week 4      | Completed |
| Preserve ambiguous-match protection              | Job Application Tracker Team | End of Week 4      | Completed |
| Add explicit confirmation before deletion        | Job Application Tracker Team | End of Week 4      | Completed |
| Improve the "not found" error message            | Job Application Tracker Team | End of Week 4      | Completed |
| Update the delete tool description               | Job Application Tracker Team | End of Week 4      | Completed |
| Test deletion with and without confirmation      | Job Application Tracker Team | End of Week 4      | Completed |
| Test ambiguous deletion with confirmation        | Job Application Tracker Team | End of Week 4      | Completed |
| Add a unique application ID for precise deletion | Job Application Tracker Team | Future improvement | Open      |

---

# Follow-up Changes

The peer review recommendations were implemented in the `delete_job_application` tool.

The changes include:

* Required `confirm` boolean in the input schema.
* Explicit confirmation check before deletion.
* Improved "not found" error message.
* Updated tool description documenting confirmation and ambiguous-match behavior.
* Existing duplicate-match protection was preserved.

The changes were committed with:

```text
fix: implement peer review recommendations for delete tool
```

and pushed to the `harden-delete` branch.

---

# Final Review Result

**Result: Passed — No P0/must-fix findings**

Both peer reviewers confirmed that the `delete_job_application` tool has good input validation, safe matching logic, controlled error handling, and ambiguous-match protection.

No P0/must-fix security issues were identified.

The recommended improvements from the peer reviews were addressed where practical during Week 4. Explicit deletion confirmation, clearer error messages, and improved tool documentation were implemented.

The unique application ID recommendation remains documented as a future improvement because it would require a broader change to the application's data model and deletion workflow.

The project is ready to proceed with the Week 4 hardening workflow and peer confirmation.
