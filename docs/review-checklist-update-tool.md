# Week 4 On-site Peer Review Checklist

## Project

**Job Application Tracker MCP Server**

## P0 Tool Reviewed

`update_application_status`

## P0 Tool Owner

**Marwa Faqeeh**

## Peer Reviewers

- **Shaymaa Dar Taha**
- **Roa Makhtoub**

---
## Peer Review Areas

The review covered:

- Schemas and validation
- Error handling
- Secrets
- Data and file access restrictions
- README and demo path
- SECURITY.md
- MCP Inspector testing
- Multiple matching applications
- Same-status update behavior

# Peer Review Evidence


## Peer Review Email — Roa Makhtoub

Hi Marwa,

I completed the Week 4 peer review of your `update_application_status` tool. I reviewed the input schema, validation rules, status allowlisting, application matching logic, update behavior, error handling, and the different success and failure cases through MCP Inspector.

### What I Reviewed

The input schema correctly requires both `company` and `jobTitle`, trims the values, and limits each field to 100 characters. The `status` field uses an explicit enum containing only `Applied`, `Interview`, `Accepted`, and `Rejected`, which prevents unsupported status values from being passed to the tool.

I also verified that company and job title matching is case-insensitive. This is handled by trimming and converting both the stored values and the provided values to lowercase before comparison.

### Test Results

The following scenarios were tested successfully:

- Successful status update
- Non-existing company
- Non-existing job title
- Empty company
- Empty job title
- Invalid status value
- Case-insensitive company and job title matching
- Updating an application to its existing status
- Multiple applications with the same company and job title

The successful update response clearly identifies the application and the resulting status. The not-found response also provides the company and job title that were searched for.

The validation errors correctly identify the relevant field and explain why the input was rejected.

### Finding: Multiple Matching Applications

I found one important issue when testing multiple applications with the same company and job title.

The current implementation uses `applications.find(...)` to locate the application. As a result, when more than one application matches the provided company and job title, the tool updates the first matching application without informing the user that multiple matches exist.

This creates an ambiguous update request and could result in the wrong application being modified.

I recommend changing the matching logic so that it first identifies all matching applications:

- No matches → return the existing not-found error.
- Exactly one match → perform the update.
- More than one match → refuse the update and return an error explaining that multiple applications match the provided company and job title.

This would prevent an ambiguous request from modifying an unintended application.

### Additional Observations

The status values are currently case-sensitive because they are defined using `z.enum()`. For example, `Applied` is accepted while `applied` is rejected. This is consistent with the current schema and is not a security issue, but case-insensitive status input could be considered if that behavior is desired.

I also noticed that the tool reports a successful update when the requested status is already the application's current status. For example, changing `Applied` to `Applied` results in a successful update response even though the stored value does not actually change.

This is not a security issue, but the behavior could be improved by detecting the existing status and returning a message indicating that the application is already in that status.

### Error Handling and Security

The tool handles errors without exposing stack traces or internal implementation details to the user. Detailed errors are logged server-side, while the tool returns a controlled error message.

The update is also only written to the data file after a matching application has been found.

### Overall Feedback

Overall, the `update_application_status` tool has strong input validation, a clear status allowlist, appropriate case-insensitive matching for company and job title, and safe error handling.

I did not identify any P0/must-fix security issues during the review. The main issue I recommend addressing is the handling of multiple matching applications, because the current behavior can modify the first match when the request is ambiguous.

The same-status behavior and case-sensitive status input are minor observations rather than must-fix issues.

Best,  
Roa 

---

# Peer Review Email — Shaymaa Dar Taha

Hi Marwa,

I reviewed your `update_application_status` tool as part of the Week 4 peer review.

## What Worked Well

1. The input schema validates that `company` and `jobTitle` are required and limits them to 100 characters.
2. Inputs are trimmed and matched case-insensitively.
3. The `status` field is restricted to the allowed values: `Applied`, `Interview`, `Accepted`, and `Rejected`.
4. The tool safely handles cases where no matching application is found.
5. Errors returned to the user do not expose internal stack traces or implementation details.
6. Application data is validated again before it is written back to the JSON file.

## Issues Found

I did not identify any P0/must-fix security issues in the current implementation.

One potential issue is that the tool currently uses `.find()` to locate the application. If multiple applications have the same `company + jobTitle`, only the first matching application would be updated. This could result in the wrong application being modified.

## Recommended Improvements

1. **Duplicate matches:** Replace the single `.find()` lookup with logic that checks all matching applications. If more than one match is found, the update should be refused with a safe message such as:

   `Multiple matching applications found. Update was not performed.`

2. **Same status:** If the application already has the requested status, the tool could avoid rewriting the file and return a message such as:

   `Application is already in Interview status. No update was performed.`

3. **Status transitions:** This depends on the intended requirements of the project. It may be worth deciding whether any allowed status can be changed to any other status, or whether the tool should enforce a logical lifecycle such as:

   `Applied → Interview → Accepted/Rejected`

   If a lifecycle is required, transitions such as `Accepted → Interview` or `Rejected → Accepted` could be rejected. If the project allows any status change, the current enum validation is sufficient.

## Suggested Tests

- Empty company or job title
- Input longer than 100 characters
- Invalid status value
- Updating an existing application
- Updating an application that does not exist
- Case-insensitive company/job title matching
- Multiple applications with the same company and job title
- Updating an application to its current status

## Overall Feedback

Overall, the `update_application_status` tool has good input validation and error handling. The main improvement I recommend is handling multiple matching applications before performing an update, so that an ambiguous request cannot modify the wrong application.

No P0 fixes are required based on this review. The remaining recommendations are mainly improvements to data safety, clarity, and business logic.

Best,  
Shaymaa Dar Taha

---

# Fix Verification

The identified issues were fixed and verified through MCP Inspector.

## Multiple Matching Applications

The tool was updated to detect multiple matching applications before performing an update.

**MCP Inspector Test:**

Multiple applications with the same company and job title were tested.

**Tool Result:**

`"Multiple matching applications found. Update was not performed."`

**Result:** Fixed and verified successfully.

## Same Status

The tool was updated to detect when the requested status is already the application's current status.

**MCP Inspector Test:**

The application was updated with the same status it already had.

**Tool Result:**

`"Application is already in Applied status. No update was performed."`

**Result:** Fixed and verified successfully.

---

# Action Items

| Action Item | Owner | Due Date | Status |
|---|---|---|---|
| Handle multiple matching applications safely | Marwa Faqeeh | End of Week 4 | Completed |
| Handle same-status updates without unnecessary writes | Marwa Faqeeh | End of Week 4 | Completed |
| Verify input validation and status allowlisting | Marwa Faqeeh | End of Week 4 | Completed |
| Test multiple matching applications through MCP Inspector | Marwa Faqeeh | End of Week 4 | Completed |
| Test same-status updates through MCP Inspector | Marwa Faqeeh | End of Week 4 | Completed |

---

# Follow-up Changes

The peer review recommendations were addressed in the `update_application_status` tool.

The changes include:

- Detecting multiple matching applications before updating.
- Refusing ambiguous updates when multiple matches are found.
- Detecting same-status updates.
- Avoiding unnecessary file writes when the status is already unchanged.
- Verifying both fixes through MCP Inspector.

The fixes were implemented on the `week-4-harden` branch.

---

# Final Review Result

**Result: Passed — No P0/must-fix findings**

Both peer reviewers confirmed that the `update_application_status` tool has good input validation, status allowlisting, case-insensitive matching, and safe error handling.

The identified issues were addressed and successfully verified through MCP Inspector.

The remaining recommendation regarding status transition rules is considered a future business-logic improvement rather than a P0 security issue.

The `update_application_status` tool is ready to proceed with the Week 4 hardening workflow and peer confirmation.