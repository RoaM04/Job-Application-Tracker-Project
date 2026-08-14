# Week 4 Peer Review Checklist — Job Application Tracker

## Project

**Job Application Tracker**

## Week

**Week 4**

## P0 Tool Reviewed

`add_job_application`

## Branch

`harden-add-job-application`

## Reviewee / Tool Owner

**Shaymaa Dar Taha**

## Peer Reviewers

* **Marwa Faqeeh**
* **Roa Makhtoob**

---

# Peer Review Areas

The peer review covered:

* Input schema and validation
* Error handling
* Secrets
* Data and file access restrictions
* Duplicate detection
* URL and protocol restrictions
* Date validation
* Concurrency safety
* Validation message clarity
* MCP Inspector testing
* README and demo path
* SECURITY.md

---

# Peer Review Evidence

## Peer Reviewer — Marwa Faqeeh

Marwa Faqeeh completed a hands-on peer review of the `add_job_application` P0 tool using MCP Inspector.

The review included actual tool calls with valid, invalid, duplicate, and concurrent inputs. The reviewer recorded the inputs used, the server behavior observed, the issues identified, and the recommended fixes.

### What Worked Well

The reviewer confirmed that:

* The input schema requires `company`, `jobTitle`, `applicationDate`, and `applicationLink`.
* Company and job title values are trimmed and limited to 100 characters.
* Empty company and job title values are rejected.
* Application links are validated as URLs and restricted to `http` and `https`.
* Duplicate detection is case-insensitive for company and job title.
* Duplicate applications are rejected.
* New applications receive the default status `Applied` and an empty notes array.
* The tool uses the shared `readJobApplications` and `writeJobApplications` helpers.
* No hard-coded secrets or credentials were found.
* The tool does not accept a user-supplied arbitrary file path.
* Unexpected errors are returned using a generic error message while detailed information is logged server-side with `console.error`.

---

# Tool-Level Review Notes — Marwa Faqeeh

The following tests were **executed by Marwa Faqeeh through MCP Inspector**.

## Test 1 — Duplicate Application

**Tool:** `add_job_application`

**Input scenario:**

An existing application was present:

`Google — Software Engineer`

The reviewer submitted another application using the same company and job title.

**Observed server behavior:**

The tool rejected the request and returned a duplicate-application message.

**Result:** Passed.

**Reviewer finding:** Duplicate protection works correctly.

---

## Test 2 — Invalid Application Date / Year 0000

**Tool:** `add_job_application`

**Input:**

```text
applicationDate: "0000-01-01"
```

**Observed behavior before the fix:**

The server accepted the application even though year `0000` is outside the intended realistic application-date range.

**Issue identified by reviewer:**

Year `0000` was accepted.

**Recommended fix:**

Restrict the application date year to `1900–2100`.

**Result:** Finding identified and fixed.

---

## Test 3 — Concurrent Add Requests

**Tool:** `add_job_application`

**Input scenario:**

During the original peer review, Marwa executed two `add_job_application` requests concurrently.

**Observed behavior during the original peer review:**

According to Marwa's review, both requests returned an `Added` response, but only one application remained in the data file.

**Issue reported by reviewer:**

The reported behavior suggested a potential lost-update condition in the read-check-write sequence, where one concurrent operation could overwrite changes made by another operation.

**Recommended fix:**

Protect the complete read-check-write operation with a locking mechanism.

**Mitigation implemented:**

An in-memory write lock was added around the complete read-check-write operation.

**Follow-up verification:**

A dedicated concurrency test script, `scripts/concurrency-test.ts`, was created to verify the behavior after the write lock was implemented.

The script executes two concurrent add operations using `Promise.all()` and intentionally introduces a 500 ms delay inside the locked section to make concurrent access visible.

The test was executed using:

`npx tsx scripts/concurrency-test.ts`

The output confirmed that the lock was acquired sequentially:

1. `Concurrency-Test-A` acquired the lock, read 16 applications, and completed the write with 17 applications.
2. `Concurrency-Test-B` acquired the lock only after the first operation completed, then read 17 applications and completed the write with 18 applications.

The final verification showed that both test applications were present in `data/job-applications.json`:

* `Concurrency-Test-A — Software Engineer A`
* `Concurrency-Test-B — Software Engineer B`

Both operations completed successfully, and neither update was lost.

**Result:**

Mitigated and successfully verified through dedicated concurrent testing after the write lock was implemented.

**Important clarification:**

The original lost-update behavior reported by Marwa could not be independently reproduced during the follow-up test. However, the in-memory write lock was retained as a defensive mitigation because the underlying operation uses a shared read-check-write sequence and the reported behavior represented a potential concurrency risk.


## Test 4 — Unexpected File/Read Failure

**Tool:** `add_job_application`

**Input scenario:**

The reviewer triggered an unexpected file/read failure to verify whether internal implementation details would be exposed to the model.

**Observed server behavior:**

The tool returned a generic error message to the model. No file paths, stack traces, or internal implementation details were returned.

Detailed error information remained available server-side through `console.error`.

**Result:** Passed.

**Important clarification:**

This safe error-handling behavior was already implemented before the Week 4 peer review. Marwa's review verified the existing behavior; it was not a new defect introduced or fixed as a result of this review.

---

# Peer Reviewer — Roa Makhtoob

Roa Makhtoob also completed a hands-on peer review of the `add_job_application` P0 tool using MCP Inspector.

The review included actual successful and invalid tool calls. Roa recorded the inputs used, server responses, and validation behavior.

---

# Tool-Level Review Notes — Roa Makhtoob

The following tests were **executed by Roa Makhtoob through MCP Inspector**.

## Test 1 — Successful Application Creation

**Tool:** `add_job_application`

**Input scenario:**

A valid job application was submitted with valid values for:

* `company`
* `jobTitle`
* `applicationDate`
* `applicationLink`

**Observed server behavior:**

The tool successfully created the application and returned a response confirming the operation and providing the application details and initial status.

**Result:** Passed.

---

## Test 2 — Duplicate Application

**Tool:** `add_job_application`

**Input scenario:**

Roa submitted an application using the same company and job title as an existing application.

**Observed server behavior:**

The tool rejected the duplicate.

Company and job title matching correctly handled capitalization and surrounding whitespace.

**Result:** Passed.

---

## Test 3 — Invalid Calendar Date

**Tool:** `add_job_application`

**Input scenario:**

An invalid calendar date was submitted.

**Observed server behavior:**

The application was rejected with a validation error.

**Result:** Passed.

---

## Test 4 — Empty Company

**Tool:** `add_job_application`

**Input:**

```text
company: ""
```

**Observed server behavior:**

The schema rejected the request and returned a field-specific validation error.

**Result:** Passed.

---

## Test 5 — Empty Job Title

**Tool:** `add_job_application`

**Input:**

```text
jobTitle: ""
```

**Observed server behavior:**

The schema rejected the request and returned a field-specific validation error.

**Result:** Passed.

---

## Test 6 — Empty Application Date

**Tool:** `add_job_application`

**Input:**

```text
applicationDate: ""
```

**Observed behavior before the fix:**

The server returned two validation messages for the same field:

* Date format validation
* Calendar validity validation

**Issue identified:**

The validation response was unnecessarily duplicated.

**Fix implemented:**

Date validation was rewritten using `superRefine` so that the first relevant validation failure is reported clearly.

**Result:** Fixed.

---

## Test 7 — Empty Application Link

**Tool:** `add_job_application`

**Input:**

```text
applicationLink: ""
```

**Observed behavior before the fix:**

The server returned:

```text
Invalid URL
```

**Issue identified:**

Because the field is required, a required-field validation message is clearer than a generic URL parsing error.

**Fix implemented:**

An explicit required-field check was added before URL parsing.

**Result:** Fixed.

---

## Test 8 — Non-HTTP/HTTPS URL Scheme

**Tool:** `add_job_application`

**Inputs:**

```text
applicationLink: "javascript:alert(1)"
```

and

```text
applicationLink: "file:///etc/passwd"
```

**Observed server behavior:**

Both inputs were rejected by the existing URL/protocol validation.

The observed validation response was:

```text
Input validation error: Invalid arguments for tool add_job_application:
applicationLink: Please enter a valid URL
```

**Result:** Passed.

**Security finding:**

The HTTP/HTTPS-only restriction correctly prevented unsupported URL schemes such as `javascript:` and `file:` from being accepted.

---

# Reviewer-Executed Test Summary

The peer reviewers directly exercised the `add_job_application` tool through MCP Inspector.

### Marwa Faqeeh tested:

* Duplicate application
* Invalid application year `0000-01-01`
* Concurrent add requests
* Unexpected file/read failure and error exposure

### Roa Makhtoob tested:

* Successful application creation
* Duplicate application
* Invalid calendar date
* Empty company
* Empty job title
* Empty application date
* Empty application link
* `javascript:` URL scheme
* `file:` URL scheme

These tests provide tool-level evidence that the reviewers exercised the P0 tool rather than only reviewing the checklist or source code.

---

# Issues / Findings

## Finding #1 — Date Validation: Year `0000` Accepted

The original date validation accepted:

`0000-01-01`

### Recommended Fix

Restrict the application date year to:

`1900–2100`

### Status

**Fixed.**

---

## Finding #2 — Error Handling

The reviewer verified that unexpected errors do not expose raw `error.message`, file paths, stack traces, or internal implementation details to the model.

The model receives a generic error response, while detailed information is logged using:

`console.error`

### Status

**Already compliant before the peer review — verified by the reviewer.**

No code change was required as a result of this review item.

---

## Finding #3 — Potential Concurrent Add / Race Condition

During the peer review, Marwa reported observing a potential lost-update condition when two `add_job_application` requests were executed concurrently. According to the original review result, both requests returned success, but only one application remained in the data file.

### Follow-Up Verification

A dedicated concurrency test script was created:

`scripts/concurrency-test.ts`

The script executes two concurrent add operations using `Promise.all()` and includes an artificial 500 ms delay inside the locked section to make concurrent access visible.

The test was executed with:

`npx tsx scripts/concurrency-test.ts`

The follow-up output confirmed that the write lock serialized the two operations:

* `Concurrency-Test-A` acquired the lock first, read 16 applications, and wrote 17 applications.
* `Concurrency-Test-B` acquired the lock after the first operation completed, read 17 applications, and wrote 18 applications.
* Both operations completed successfully.
* Both applications were present in the final `data/job-applications.json`.
* No update was lost during the test.

The final file contained both:

* `Concurrency-Test-A — Software Engineer A`
* `Concurrency-Test-B — Software Engineer B`

### Risk Assessment

The original behavior reported by the reviewer could not be independently reproduced during the follow-up verification. Nevertheless, the read-check-write sequence operates on shared application data, so overlapping writes represent a potential concurrency risk if not protected.

### Mitigation

An in-memory write lock was added around the complete read-check-write operation to ensure that only one write operation can perform the read, modification, and write sequence at a time.

### Status

**Mitigated and verified through dedicated concurrent testing.**

The follow-up test confirmed that both concurrent operations persisted their changes successfully after the write lock was implemented.

**Fixed.**
---

## Finding #5 — Empty Application Link Message

An empty `applicationLink` originally returned:

`Invalid URL`

### Fix

An explicit required-field check was added before URL parsing.

### Status

**Fixed.**

---

# Security and Data Handling Review

The reviewers confirmed that:

* The tool checks for an existing matching application before adding a new record.
* Duplicate detection is case-insensitive.
* Application links are restricted to HTTP and HTTPS.
* `javascript:` and `file:` schemes were explicitly tested and rejected.
* Application data is accessed through the shared `readJobApplications` and `writeJobApplications` helpers.
* The tool does not accept an arbitrary user-supplied file path.
* No hard-coded secrets or credentials were identified.
* Unexpected errors do not expose internal file-system paths or stack traces.

---

# Action Items

| Action Item                                                      | Owner            | Due Date          | Status                                  |
| ---------------------------------------------------------------- | ---------------- | ----------------- | --------------------------------------- |
| Restrict application date year to 1900–2100                      | Shaymaa Dar Taha | End of Week 4     | Completed                               |
| Verify generic error handling without internal detail leakage    | Shaymaa Dar Taha | End of Week 4     | Verified — pre-existing                 |
| Add concurrency protection around read-check-write               | Shaymaa Dar Taha | End of Week 4     | Completed — defensive mitigation        |
| Improve empty-date validation message                            | Shaymaa Dar Taha | End of Week 4     | Completed                               |
| Improve empty-link validation message                            | Shaymaa Dar Taha | End of Week 4     | Completed                               |
| Verify input validation through MCP Inspector                    | Shaymaa Dar Taha | End of Week 4     | Completed                               |
| Verify duplicate protection through MCP Inspector                | Shaymaa Dar Taha | End of Week 4     | Completed                               |
| Verify `javascript:` and `file:` rejection through MCP Inspector | Shaymaa Dar Taha | End of Week 4     | Completed                               |
| Re-test concurrent requests after concurrency mitigation         | Shaymaa Dar Taha | End of Week 4     | Completed — both applications persisted |
| Verify README and demo path                                      | Shaymaa Dar Taha | Before submission | Pending final confirmation              |
| Verify SECURITY.md                                               | Shaymaa Dar Taha | Before submission | Pending final confirmation              |

---

# Follow-Up Changes

The peer review recommendations were addressed in the `add_job_application` tool.

The changes include:

* Restricting `applicationDate` years to `1900–2100`.
* Adding an in-memory write lock around the complete read-check-write sequence as a defensive concurrency mitigation.
* Improving empty `applicationDate` validation using `superRefine`.
* Adding an explicit required-field check for `applicationLink`.
* Maintaining HTTP/HTTPS URL restrictions.
* Verifying rejection of `javascript:` and `file:` URL schemes.
* Maintaining case-insensitive duplicate detection.
* Re-testing concurrent `add_job_application` requests through MCP Inspector.
* Verifying that both applications were correctly persisted during follow-up concurrent testing.

The generic error-handling behavior was **not a review-driven change**. It was already implemented before this review and was verified by Marwa during the peer review.

### Concurrency Verification Note

The original lost-update behavior reported by Marwa could not be independently reproduced during follow-up testing. Two concurrent requests were executed through MCP Inspector and both applications were correctly saved in `data/job-applications.json`.

The in-memory write lock was retained as a defensive mitigation because the underlying operation uses a read-check-write sequence and the reported behavior represents a potential concurrency risk.

---

# Submission Package

1. `docs/review-checklist.md` from the `harden-add-job-application` branch.
2. Full peer reviewer names:

   * **Marwa Faqeeh**
   * **Roa Makhtoob**
3. Written feedback from both peer reviewers.
4. Tool-level reviewer notes containing:

   * Tool names
   * Actual inputs
   * Server responses/behavior
   * Findings
   * Fixes
5. Action items with owners and due dates.
6. Peer email screenshots attached to the submission.
7. Verification screenshots:

   * Figures 1–4: Date validation
   * Figures 5–10: Empty date and empty link validation

---

# Final Review Result

**Result: Passed — All identified findings were fixed, mitigated, or confirmed compliant.**

The `add_job_application` P0 tool was reviewed by **Marwa Faqeeh** and **Roa Makhtoob** through MCP Inspector.

The reviewers directly exercised the tool using successful, invalid, duplicate, security-related, and concurrent scenarios.

The review identified:

* An invalid year-range issue, which was fixed.
* A reviewer-reported potential concurrency/race-condition issue, which was mitigated using an in-memory write lock. The reported lost-update behavior could not be independently reproduced during follow-up testing.
* Two validation-message clarity issues, which were fixed.
* An error-handling behavior that was verified as already compliant before the peer review.

Follow-up concurrent testing confirmed that two requests could complete successfully and that both applications were correctly persisted in `data/job-applications.json`.

The review evidence includes the reviewers' tool names, inputs, observed server behavior, findings, recommended fixes, and results.

No unresolved P0 or must-fix issue remains based on the peer review and follow-up verification.

The checklist is ready for Week 4 submission once the README/demo path, `SECURITY.md`, and peer email screenshots have been finally confirmed and attached.
