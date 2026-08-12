# Week 4 On-site Peer Review Checklist

## Project

**Job Application Tracker MCP Server**

## P0 Tool Reviewed

`update_application_status`

## P0 Tool Owner

**Marwa Faqeeh**

## Peer Reviewers

- **Shaymaa Dar Taha**
- **Roa Makhtoob**

---

# Peer Review 1 — Roa Makhtoob

## Review Areas

The peer review covered:

- Input schema and validation
- Status allowlisting
- Application matching logic
- Update behavior
- Error handling
- Security
- MCP Inspector testing
- Multiple matching application scenario
- Same-status update scenario

## What Worked Well

1. The input schema requires `company` and `jobTitle` and limits each field to 100 characters.
2. Inputs are trimmed and matched case-insensitively.
3. The `status` field is restricted to `Applied`, `Interview`, `Accepted`, and `Rejected`.
4. The tool safely handles cases where no matching application is found.
5. Errors returned to the user do not expose internal stack traces or implementation details.
6. Application data is validated before being written back to the JSON file.
7. The successful update response clearly identifies the application and the resulting status.

## Issues / Findings

### Multiple Matching Applications

The tool originally used `.find()` to locate the application. If multiple applications had the same `company + jobTitle`, only the first matching application would be updated. This could result in the wrong application being modified.

### Same Status

The tool originally reported a successful update even when the requested status was already the application's current status. This resulted in an unnecessary file write because the stored value did not actually change.

## Recommended Improvements

1. **Multiple matching applications:** Check all matching applications. If more than one match is found, refuse the update with a safe error message.
2. **Same status:** Detect when the requested status is already the current status and avoid rewriting the file.
3. **Status transitions:** Consider whether the project should enforce a logical status lifecycle. If any status change is allowed, the current enum validation is sufficient.

## Suggested Tests

- Empty company or job title
- Input longer than 100 characters
- Invalid status value
- Updating an existing application
- Updating an application that does not exist
- Case-insensitive company/job title matching
- Multiple applications with the same company and job title
- Updating an application to its current status

---

# Peer Review 2 — Shaymaa Dar Taha

## Review Areas

The peer review covered:

- Input schema validation
- Input trimming
- Case-insensitive matching
- Status allowlisting
- Error handling
- Multiple matching applications
- Same-status updates
- MCP Inspector testing

## What Worked Well

1. The input schema validates that `company` and `jobTitle` are required and limits them to 100 characters.
2. Inputs are trimmed and matched case-insensitively.
3. The `status` field is restricted to `Applied`, `Interview`, `Accepted`, and `Rejected`.
4. The tool safely handles cases where no matching application is found.
5. Errors returned to the user do not expose internal stack traces or implementation details.
6. Application data is validated before being written back to the JSON file.

## Issues Found

No P0/must-fix security issues were identified during the review.

The main issue was the use of `.find()` when multiple applications had the same `company + jobTitle`, which could cause the wrong application to be updated.

The same-status behavior was also identified as a minor improvement because it caused an unnecessary file write.

---

# Fix Verification

The identified issues were addressed and the fixes were verified successfully through MCP Inspector.

### Multiple Matching Applications

The tool now detects multiple matching applications and refuses to perform the update instead of updating the first match.

**MCP Inspector Test:**

Multiple applications with the same company and job title were tested.

**Tool Result:**

`"Multiple matching applications found. Update was not performed."`

**Result:** Fixed and verified successfully.

### Same Status

The tool now detects when the requested status is already the current status and skips the unnecessary file update.

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
| Test same-status update through MCP Inspector | Marwa Faqeeh | End of Week 4 | Completed |
| Consider status transition rules | Job Application Tracker Team | Future improvement | Open |

---

# Follow-up Changes

The peer review recommendations were addressed in the `update_application_status` tool.

The changes include:

- Detecting multiple matching applications before updating.
- Refusing ambiguous updates when multiple matches are found.
- Detecting same-status updates.
- Avoiding unnecessary file writes when the status is already unchanged.
- Verifying both fixes through MCP Inspector.

---

# Final Review Result

**Result: Passed — No P0/must-fix findings**

Both peer reviewers confirmed that the `update_application_status` tool has good input validation, status allowlisting, case-insensitive matching, and safe error handling.

The main identified issues were addressed and successfully verified through MCP Inspector.

The remaining recommendation regarding status transition rules is considered a future business-logic improvement rather than a P0 security issue.

The `update_application_status` tool is ready to proceed with the Week 4 hardening workflow and peer confirmation.