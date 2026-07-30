# Data Plan — Week 3

This project uses a local JSON file as its data source. No external APIs or authentication are required.

| Tool | Data Source | Fixture Path | Auth | Rate Limits | Happy-path Example Response |
|------|-------------|--------------|------|-------------|-----------------------------|
| add_job_application | Local JSON file | `data/job-applications.json` | None | None | `{ "message": "Job application added successfully.", "company": "Google", "jobTitle": "Software Engineer" }` |
| delete_job_application | Local JSON file | `data/job-applications.json` | None | None | `{ "message": "Job application deleted successfully." }` |
| update_application_status | Local JSON file | `data/job-applications.json` | None | None | `{ "message": "Application status updated successfully.", "status": "Interview" }` |

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