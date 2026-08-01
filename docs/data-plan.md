# Data Plan — Week 3

This project uses a local JSON file as its data source. No external APIs or authentication are required.

| Tool | Source | Fixture Path | Auth | Failure Modes | Example Response |
|------|--------|--------------|------|---------------|------------------|
| `add_job_application` | Local JSON file | `data/job-applications.json` | None | Empty or malformed JSON file, missing required fields, file write error, Field exceeds maximum length | `{ "message": "Job application added successfully.", "company": "Google", "jobTitle": "Software Engineer","Application date": 2026-8-1, "Application link": https://careers.google.com/jobs/12345 }` |
| `delete_job_application` | Local JSON file | `data/job-applications.json` | None | Empty or malformed JSON file, application not found, file write error,  missing required fields | `{message": " job application for 'Software Engineer' at 'Google' has been deleted successfully." }` |
| `update_application_status` | Local JSON file | `data/job-applications.json` | None | Empty or malformed JSON file, application not found, invalid status, file write error, missing required fields  | `{ "message": "Application status updated successfully.","status": "Interview"}` |

## Data Structure

The project stores all job applications in:

```
data/job-applications.json
```

Each application contains:

```json
{
  "company": "Google",
  "jobTitle": "Software Engineer",
  "applicationDate": "2026-07-30",
  "applicationLink": "https://careers.google.com",
  "status": "Applied",
  "notes": []
}
```

## Notes

- Data is stored locally in a JSON file.
- No API keys or authentication are required.
- The project works offline.
- The three P0 tools (Add, Delete, Update Status) read from and write to the same JSON file.
