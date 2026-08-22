# Example Conversations

These examples show how a user can interact with the Job Application Tracker MCP through an AI model.

## Roa

### Conversation A — Delete a Job Application

**User prompt:**

Delete a job application with the company name google and job title cloud engineer.

**Expected tool call:**

`delete_job_application`

**Key arguments:**

```json
{
  "company": "Google",
  "jobTitle": "Cloud Engineer",
  "confirm": true
}
```

**Good final answer:**

Your Google Cloud Engineer job application has been deleted successfully.

---

### Conversation B — Add an Application Note

**User prompt:**

Add "Waiting for response" as a note to my amazon backend developer application.

**Expected tool call:**

`add_job_application_note`

**Key arguments:**

```json
{
  "company": "Amazon",
  "jobTitle": "Backend Developer",
  "notes": ["Waiting for response"]
}
```

**Good final answer:**

The note "Waiting for response" was added successfully to your Amazon Backend Developer application.

---

### Conversation C — Get Job Application Details

**User prompt:**

Give me the full information about all job applications with Microsoft.

**Expected tool call:**

`get_job_application_details`

**Key arguments:**

```json
{
  "company": "Microsoft"
}
```

**Example returned application:**

```json
[
  {
    "company": "Microsoft",
    "jobTitle": "Software Engineer",
    "applicationDate": "2026-07-18",
    "applicationLink": "https://careers.microsoft.com/jobs/2001",
    "status": "Applied",
    "notes": [
      "Waiting for recruiter response"
    ]
  }
]
```

**Good final answer:**

You have one job application with Microsoft. It is for a Software Engineer position, applied on July 18, 2026, and its current status is Applied. The application includes a note saying "Waiting for recruiter response."

---
## Marwa

### Conversation A — Update Application Status

**User prompt:**

Update my Google Cloud Engineer application status from Applied to Interview.

**Expected tool call:**

`update_application_status`

**Key arguments:**

```json
{
  "company": "Google",
  "jobTitle": "Cloud Engineer",
  "status": "Interview"
}
```

**Good final answer:**

Your Google Cloud Engineer application status was updated successfully to Interview.

---

### Conversation B — List Job Applications

**User prompt:**

Show me all my current job applications and their statuses.

**Expected tool call:**

`list_job_applications`

**Key arguments:**

```json
{}
```

**Good final answer:**

Here are your current job applications and their statuses.

---

### Conversation C — Update and List Applications

**User prompt:**

Update my Amazon Backend Developer application status to Rejected, then show me my current job applications.

**Expected tool calls:**

1. `update_application_status`
2. `list_job_applications`

**Key arguments:**

**Tool call 1 — `update_application_status`:**

```json
{
  "company": "Amazon",
  "jobTitle": "Backend Developer",
  "status": "Rejected"
}
```

**Tool call 2 — `list_job_applications`:**

```json
{}
```

**Good final answer:**

Your Amazon Backend Developer application status was updated to Rejected. Here is your current list of job applications.

---



## Shaymaa

### Conversation A — Add a Job Application

**User prompt:**

Add a Cloud Engineer application at IBM. I applied on August 2, 2026, and the application link is https://www.ibm.com/careers/5001.

**Expected tool call:**

`add_job_application`

**Key arguments:**

```json
{
  "company": "IBM",
  "jobTitle": "Cloud Engineer",
  "applicationDate": "2026-08-02",
  "applicationLink": "https://www.ibm.com/careers/5001",
  "status": "Applied"
}
```

**Good final answer:**

Your IBM Cloud Engineer job application was added successfully.

---

### Conversation B — Add a Job Application with a Note

**User prompt:**

Add my Software Engineer application at Microsoft. I applied on July 18, 2026, and add a note saying "Waiting for recruiter response."

**Expected tool calls:**

1. `add_job_application`

**Key arguments:**

```json
{
  "company": "Microsoft",
  "jobTitle": "Software Engineer",
  "applicationDate": "2026-07-18",
  "applicationLink": "https://careers.microsoft.com/jobs/2001",
  "status": "Applied"
}
```

**Good final answer:**

Your Microsoft Software Engineer application was added successfully.

---

### Conversation C — Add and Check a Job Application

**User prompt:**

Add my Backend Developer application at Amazon. I applied on August 5, 2026, with the status Applied.

**Expected tool calls:**

1. `add_job_application`
2. `get_job_application_details`

**Key arguments:**

**Tool call 1 — `add_job_application`:**

```json
{
  "company": "Amazon",
  "jobTitle": "Backend Developer",
  "applicationDate": "2026-08-05",
  "applicationLink": "https://www.amazon.jobs/en/",
  "status": "Applied"
}
```

**Tool call 2 — `get_job_application_details`:**

```json
{
  "company": "Amazon",
  "jobTitle": "Backend Developer"
}
```

**Good final answer:**

Your Amazon Backend Developer application was added successfully. It is currently marked as Applied.


...