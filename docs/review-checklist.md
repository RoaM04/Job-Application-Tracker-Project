# Week 4 Peer Review Checklist

## P0 Tool Reviewed

`update_application_status`

## Peer Reviewers

- Shaymaa Dar Taha
- Roa Makhtoob

## What Worked Well

- The input schema validates `company` and `jobTitle`.
- Company and job title inputs are trimmed and matched case-insensitively.
- The `status` field is restricted to the allowed values:
  `Applied`, `Interview`, `Accepted`, and `Rejected`.
- The tool safely handles applications that are not found.
- Errors returned to the user do not expose internal stack traces or implementation details.
- Application data is validated before being written back to the JSON file.

## Issues / Findings

### Multiple Matching Applications

The tool originally used `.find()` to locate an application. If multiple applications had the same company and job title, only the first matching application was updated.

This could result in the wrong application being modified.

### Same Status

The tool originally updated and rewrote the application even when the requested status was already the current status.

This could result in an unnecessary file write.

## Recommended Improvements

1. Check all matching applications before updating.
2. If multiple matches are found, refuse the update and return a safe error message.
3. If the application already has the requested status, return a message indicating that no update was performed and avoid rewriting the file.

## Action Items

| Action Item | Owner | Due Date | Status |
|---|---|---|---|
| Handle multiple matching applications safely | Marwa | End of Week 4 | Completed |
| Handle same-status updates without unnecessary writes | Marwa | End of Week 4 | Completed |

## Overall Result

No P0/must-fix security issues were identified. The main improvement was to prevent ambiguous updates when multiple applications match the same company and job title. The same-status behavior was also improved to avoid unnecessary file writes.