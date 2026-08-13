# Week 4 Peer Review Checklist — Job Application Tracker

**Project:** Job Application Tracker
**P0 Tool Reviewed:** `add_job_application`
**Branch:** `harden-add-job-application`
**Peer Reviewers:** Marwa Faqeeh, Roa Makhtoob
**Reviewee:** Shaymaa Dar Taha

## Checklist Areas

| Area | Reviewer | Status | Notes |
|---|---|---|---|
| Input schema & validation | Marwa, Roa | ✅ Pass | Required fields enforced; company/jobTitle trimmed + capped at 100 chars |
| Error handling | Marwa | ⚠️ Finding → Fixed | See Finding #2 below |
| Secrets | Marwa | ✅ Pass | No hard-coded secrets/credentials found |
| Data / file access restrictions | Marwa | ✅ Pass | No arbitrary file path accepted; uses shared read/write helpers |
| Duplicate detection | Marwa, Roa | ✅ Pass | Case-insensitive, trims before comparing |
| URL / protocol restriction | Marwa, Roa | ✅ Pass | Restricted to `http://` / `https://` |
| Date validation | Marwa | ⚠️ Finding → Fixed | See Finding #1 below |
| Concurrency safety | Marwa | ⚠️ Finding → Fixed | See Finding #3 below |
| Validation message clarity | Roa | ⚠️ Minor → Fixed | Empty-date double message, empty-link generic message |
| README & demo path | — | ☐ Confirm before submission | Not covered in either email — verify separately |
| SECURITY.md | — | ☐ Confirm before submission | Not covered in either email — verify separately |

## Findings & Action Items

| # | Finding | Severity | Reported By | Fix | Owner | Due Date | Status |
|---|---|---|---|---|---|---|---|
| 1 | Year `0000` accepted as a valid application date | P0 | Marwa Faqeeh | Restricted year range to 1900–2100 in `applicationDate` schema | Shaymaa | End of Week 4 | ✅ Fixed |
| 2 | `catch` block could leak `error.message` (internal/file-system details) to the model | P0 | Marwa Faqeeh | Confirmed already returning a generic error message to the model, with details logged server-side via `console.error` — no change needed | Shaymaa | End of Week 4 | ✅ Already compliant |
| 3 | Race condition: concurrent `add_job_application` calls can read-check-write over each other, losing an update | P0 | Marwa Faqeeh | Added an in-memory write lock around the full read-check-write sequence so concurrent requests are processed sequentially | Shaymaa | End of Week 4 | ✅ Fixed |
| 4 | Empty `applicationDate` returned two stacked validation messages (format + calendar validity) | Minor | Roa Makhtoob | Rewrote date validation with `superRefine`, stops at first failure | Shaymaa | End of Week 4 | ✅ Fixed |
| 5 | Empty `applicationLink` returned generic `"Invalid URL"` instead of a required-field message | Minor | Roa Makhtoob | Added explicit required-field check before URL parsing | Shaymaa | End of Week 4 | ✅ Fixed |

## Verification Notes

- **Finding #1 (date range):** Reproduced pre-fix (`0000-01-01` accepted), then confirmed rejected post-fix. Screenshots: Figures 1–4.
- **Finding #3 (race condition):** Marwa was unable to reproduce the lost-update behavior in her own test run, but flagged it as a legitimate risk given the read-check-write pattern. Fix applied proactively (write lock) rather than left open.
- **Finding #4 & #5:** Reproduced pre-fix and post-fix behavior for both empty-date and empty-link cases. Screenshots: Figures 5–9.


## Submission Package

1. This file (`docs/review-checklist.md`)
2. Peer reviewer names: **Marwa Faqeeh**, **Roa Makhtoob**
3. Full written feedback: attached in tha module
4. Email screenshots: attached in tha module
4