# Job Application Tracker MCP — Demo Script

**Total time: 5:00**

## 0:00–0:40 — The Problem

**Say:**

> “Job seekers often apply to many companies at the same time, and it becomes difficult to remember which role they applied for, the current status, notes, and follow-up details.
>
> Our Job Application Tracker solves this by letting users manage their applications through natural language instead of manually searching through spreadsheets or files.”

**Show:** Problem slide.

**Key points:**

* Track companies and job titles.
* Track application statuses.
* Store notes and important details.
* Find application information quickly.

---

## 0:40–1:10 — Architecture

**Say:**

> “The architecture is simple. The user speaks naturally to Claude Desktop. Claude interprets the request and routes it to the appropriate MCP tool. Our TypeScript MCP server validates the input using Zod and works with local JSON storage.
>
> The data stays on the user's device, so we don't depend on paid external APIs or cloud storage.”

**Show:** Architecture slide.

**Diagram:**

```text
User
  ↓
Claude Desktop
  ↓
MCP Server
(TypeScript + Zod)
  ↓
Local JSON Storage
```

**Transition:**

> “Now let's see the important part — the tools working live.”

---

## 1:10–3:30 — Live Tool Calls

### Live Demo 1 — Add an Application

**Prompt:**

> “Add a Cloud Engineer application at IBM. I applied on August 2, 2026, and the application link is https://www.ibm.com/careers/5001.”

**Show:**

* Claude receives the natural-language request.
* `add_job_application` is selected.
* The application is saved.
* The tool returns the result.

**Say:**

> “Instead of opening a form or editing JSON manually, the user simply describes the application. The MCP tool handles the operation and stores it locally.”

---

### Live Demo 2 — Update the Status

**Prompt:**

> “Update my IBM Cloud Engineer application status to interview.”

**Show:**

* Claude identifies the existing application.
* `update_application_status` is called.
* The status changes to **interview**.

**Say:**

> “The same natural-language interface can also update an existing application. Here, the status changes from the previous state to interview.”

---

### Backup Prompt

If either live demo fails, use:

> “List all my job applications.”

**Tool:** `list_job_applications`

**Say:**

> “As a backup, we can always retrieve the stored applications and demonstrate that our local data is available and accessible through MCP.”

---

### Offline Backup — Wi-Fi Failure

If Wi-Fi fails:

1. Stop relying on Claude Desktop connectivity.
2. Use the project's local fixture/data file.
3. Start the local MCP server.
4. Demonstrate the same tool flow using the local data.
5. Show the returned JSON/result from the MCP tool.

**Say:**

> “The project is designed around local JSON storage, so the core data does not depend on a cloud database. If connectivity becomes an issue during the demo, we can switch to our local fixtures and continue demonstrating the MCP tools offline.”

---

## 3:30–4:30 — What We'd Build Next

**Say:**

> “For the next version, we would focus on three areas.
>
> First, better application analytics, so users can understand their application progress and outcomes.
>
> Second, follow-up reminders that automatically prompt users when an application needs attention.
>
> Third, integrations with external services and APIs, allowing the tracker to become part of a larger job-search workflow.”

**Show:** Next Steps slide.

**Three items:**

* Better Application Analytics
* Follow-Up Reminders
* API Integrations

---

## 4:30–5:00 — Questions

**Say:**

> “That is our Job Application Tracker MCP. It turns natural-language requests into useful job-application management actions while keeping the data local.
>
> Thank you. We're ready for your questions.”

**Stop the timer at 5:00.**

---

# Slide Plan — Maximum 5 Slides

### Slide 1 — Title

**Job Application Tracker MCP**

*Manage job applications through natural language.*

Team:

* Roa Makhtoob
* Marwa Fageeh
* Shaymaa Dar Taha

---

### Slide 2 — The Problem

**The Problem**

* Track companies & titles
* Track application statuses
* Store notes & details
* Find information quickly

---

### Slide 3 — Architecture

**How It Works**

```text
Natural Language
       ↓
Claude Desktop
       ↓
MCP Server
TypeScript + Zod
       ↓
Local JSON Storage
```

---

### Slide 4 — MCP Tools

| Priority | Tools                                      |
| -------- | ------------------------------------------ |
| P0       | `add_job_application`                      |
| P0       | `delete_job_application`                   |
| P0       | `update_application_status`                |
| P1       | `add_job_application_note`                 |
| P1       | `list_job_applications`                    |
| P1       | `get_job_application_details`              |
| P2       | Search, statistics, notes & detail updates |

---

### Slide 5 — What We'd Build Next

* 📊 Better Application Analytics
* 🔔 Follow-Up Reminders
* 🔗 API Integrations

---

# Rehearsal Plan

## Rehearsal 1

* [ ] Start a 5-minute timer.
* [ ] Deliver the introduction without stopping.
* [ ] Run both live prompts.
* [ ] Test the backup prompt.
* [ ] Record the final time.
* [ ] Write down where time was lost.

## Rehearsal 2

* [ ] Start a new 5-minute timer.
* [ ] Use the shorter version of any section that ran long.
* [ ] Run the two live prompts again.
* [ ] Test the offline/fixtures backup.
* [ ] Confirm the demo finishes before 5:00.

**Hard rule:** If the rehearsal exceeds 5 minutes, cut slide content or narration — **do not cut the live demo.**
