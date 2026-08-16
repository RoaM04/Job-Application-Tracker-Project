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

### Conversation A

...

### Conversation B

...

### Conversation C

...

---

## Shaymaa

### Conversation A

...

### Conversation B

...

### Conversation C

...