# Manual Test Plan — Week 5

The P0 tools covered in this manual test plan are:

* `add_job_application`
* `delete_job_application`
* `update_application_status`

The tools use the shared data fixture:

`data/job-applications.json`

Before each test that modifies the data, reset the fixture to its original known state.

| id    | tool                        | setup                                                                              | input                                                                                           | expected                                                                                 | result                                                                              | evidence                                                 |
| ----- | --------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------- |

| TC-01 | `add_job_application` | Reset `data/job-applications.json` to the known fixture state. | Use a valid happy-path input from the existing `examples/*.json` file. | The job application is added successfully and the data file is updated. | **PASS — Job application added successfully. Company: nextflows, Job Title: Cloud Engineer, Application Date: 2026-08-02, Application Link: [https://www.ibm.com/careers/5001](https://www.ibm.com/careers/5001), Status: Applied.** | [TC-01 screenshot](evidence/TC-01-add-happy.png) |

| TC-02 | `add_job_application` | Reset `data/job-applications.json` to the known fixture state. | Submit an input with a required field missing (`applicationLink`). | A validation error is returned and no invalid application is added. | **PASS — Validation error returned: "Application link is required." No invalid application was added.** | [TC-02 screenshot](evidence/TC-02-add-empty-data.png) |

| TC-03 | `delete_job_application`    | Reset `data/job-applications.json` with an existing application.                   | Company: `Google`; Job title: `Software Engineer`; Confirm: checked.                            | The matching job application is deleted successfully and the data file is updated.       | **PASS — Job application deleted successfully.**                                    | [TC-03 screenshot](evidence/TC-03-delete-happy.png)      |
| TC-04 | `delete_job_application`    | Reset `data/job-applications.json` with existing applications.                     | Company: `nextflow`; Job title: `Ai engineer`; Confirm: checked.                                | An application-not-found error is returned and existing data remains unchanged.          | **PASS — No job application was found for the specified company and job title.**    | [TC-04 screenshot](evidence/TC-04-delete-not-found.png)  |
| TC-05 | `update_application_status` | Reset `data/job-applications.json` with an existing application.                   | Use valid input with an existing application and a valid status such as `Interview`.            | The application's status is updated successfully.                                        |                                                                                     |                                                          |
| TC-06 | `update_application_status` | Reset `data/job-applications.json` with an existing application.                   | Submit an invalid status value.                                                                 | A validation error is returned and the application's status remains unchanged.           |                                                                                     |                                                          |
| TC-07 | `delete_job_application`    | Temporarily replace the fixture data with an empty JSON array `[]`.                | Company: `Google`; Job title: `Software Engineer`; Confirm: checked.                            | The tool handles empty data safely and returns an appropriate response without crashing. | **PASS — No job application was found and the tool handled the empty data safely.** | [TC-07 screenshot](evidence/TC-07-delete-empty-data.png) |
| TC-08 | `update_application_status` | Simulate a slow or unavailable file operation that exceeds the configured timeout. | Attempt to update an application's status while the file operation is unavailable or times out. | A timeout/error response is returned and the tool does not hang indefinitely.            |                                                                                     |                                                          |
| TC-09 | `add_job_application` | Reset `data/job-applications.json` with an existing application for IBM and Cloud Engineer. | Company: `IBM`; Job title: `Cloud Engineer`; use otherwise valid application details. | The tool detects the duplicate application and returns an appropriate error without adding a duplicate entry. | **PASS — Duplicate application was rejected. The tool returned: "A job application already exists. Company: IBM Job Title: Cloud Engineer."** | [TC-09 screenshot](evidence/TC-09-add-duplicate.png) |



## Fixture Reset

After each test that modifies `data/job-applications.json`, restore the fixture to its original known state before running the next test.

The happy-path tests should reuse the existing files in `examples/*.json`.

For the empty-data test, temporarily set the fixture to:

```json
[]
```

After completing TC-07, restore the normal fixture data.

The `result` and `evidence` columns for the remaining tests will be completed during the manual test execution.
