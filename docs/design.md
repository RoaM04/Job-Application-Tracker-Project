# Design doc — Week 2

> Mandatory for mentor review. Open a GitHub Issue linking to this file before Week 3.

**Students:** Shaymaa Dar Taha, Roa Makhtoob, Marwa Faqeeh

**Repo:** https://github.com/RoaM04/Job-Application-Tracker-Project

**Branch:** `main`

**GitHub Issue:** https://github.com/RoaM04/Job-Application-Tracker-Project/issues/1

---

## 1. Pitch

We are building a Job Application Tracker MCP server that helps students and job seekers organize their job applications in one place. Users can add new job applications, list all saved applications, search for specific applications, update their status, add notes, and remove applications. The project stores all data locally without using paid APIs or login systems.

## 2. Demo Day user story

The live demo will take around 2–3 minutes:

1. The MCP server and MCP Inspector start successfully.
2. The user asks the model to add a new job application.
3. The model calls the `add_job_application` tool and stores the application locally.
4. The user asks to update the application status to `Interview`.
5. The model calls the `update_application_status` tool.
6. The user asks to search or list the saved applications.
7. The audience sees the saved application with its updated status.

## 3. Tool inventory (4–7 tools)

Exactly three tools are marked as P0 and must work for Demo Day. The remaining tools are P1 and can initially be implemented as stubs.

| Priority | Tool name (`verb_noun`) | Description (for the model) | Inputs | Outputs |
| --- | --- | --- | --- | --- |
| P0 | `add_job_application` | Add and save a new job application including the company name, job title, application date, and application link. | `company`, `jobTitle`, `applicationDate`, `applicationLink` | Confirmation message and the created application |
| P0 | `delete_job_application` | Delete a saved job application by its company name and job title. | `company`, `jobTitle` | Confirmation message or not-found error |
| P0 | `update_application_status` | Update the status of an existing job application. | `company`, `jobTitle`, `status` | Confirmation message and the updated application |
| P1 | `search_job_applications` | Search job applications by company name, job title, or keyword. | `keyword` | List of matching applications |
| P1 | `add_application_note` | Add a note or interview date to an existing job application. | `company`, `jobTitle`, `note`, optional `interviewDate` | Confirmation message and the updated application |
| P1 | `list_job_applications` | List all saved job applications. | No input required | List of all saved applications |

The accepted application statuses will be:

- `Applied`
- `Interview`
- `Accepted`
- `Rejected`

## 4. Out of scope

The following features will not be built during this cohort:

- User accounts, login, or authentication.
- Paid APIs or connections to external job websites.
- Mobile application or advanced graphical user interface.
- Automatic job application submission.
- Email or calendar integration.
- Cloud database or online synchronization.

## 5. Success criteria

You succeed on Demo Day if:

- [ ] The MCP server starts and connects successfully to MCP Inspector.
- [ ] All three P0 tools work correctly with valid and invalid inputs.
- [ ] Job application data is saved and updated locally.
- [ ] Tool inputs are validated using Zod schemas.
- [ ] The project can be demonstrated without paid APIs or an internet connection.

## 6. Top risks

| Risk | Likelihood | Mitigation |
| --- | --- | --- |
| Local data may be lost or corrupted. | Medium | Store data in a structured JSON file and validate it before reading or writing. |
| Invalid inputs may cause tool errors. | Medium | Use Zod schemas to validate required fields, dates, URLs, and application statuses. |
| The project may become too large for four weeks. | Medium | Complete the three P0 tools first and keep the P1 tools simple until the core features work. |

## 7. Evidence for Week 2

- [ ] `docs/project-choice.md` filled
- [ ] ≥3 Zod schemas under `src/schemas/`
- [ ] Tools registered (stubs OK)
- [ ] `examples/<tool>.json` for each registered tool
- [ ] Inspector screenshots attached to the GitHub Issue

## Notes from reading the Filesystem MCP Server

- Tool names follow a consistent action-based naming style, using verbs like read, write, list, search, create, edit, and move.
- Most tool descriptions are short and explain exactly one responsibility for each tool.
- Read-only tools are clearly separated from tools that modify data, making their behavior easy to understand.
- Tool metadata such as `readOnlyHint`, `idempotentHint`, and `destructiveHint` helps explain whether a tool changes data or can be safely repeated.
- Notes and error-related behavior are written in simple language, explaining what happens when a tool is called more than once or performs a destructive action.

## Mentor decision

- Status: Approved
- Comments: Approved.
