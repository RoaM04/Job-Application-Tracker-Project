# Manual Test Plan — Week 5

The P0 tools covered in this manual test plan are:

* `add_job_application`
* `delete_job_application`
* `update_application_status`

The tools use the shared data fixture:

`data/job-applications.json`

Before each test that modifies the data, reset the fixture to its original known state.

| id    | tool                        | setup                                                                                                                                        | input                                                                                           | expected                                                                                    | result                                                                              | evidence                                                                       |
| ----- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| TC-01 | `add_job_application`       | Reset `data/job-applications.json` to the known fixture state.                                                                               | Use a valid happy-path input from the existing `examples/*.json` file.                          | The job application is added successfully and the data file is updated.                     |                                                                                     |                                                                                |
| TC-02 | `add_job_application`       | Reset `data/job-applications.json` to the known fixture state.                                                                               | Submit an input with a required field missing.                                                  | A validation error is returned and no invalid application is added.                         |                                                                                     |                                                                                |
| TC-03 | `add_job_application`       | Reset `data/job-applications.json` to the known fixture state. Ensure the fixture already contains a Google / Software Engineer application. | Submit the same company and job title again using otherwise valid input.                        | A duplicate-application error is returned and no duplicate entry is added to the data file. |                                                                                     |                                                                                |
| TC-04 | `delete_job_application`    | Reset `data/job-applications.json` with an existing application.                                                                             | Company: `Google`; Job title: `Software Engineer`; Confirm: checked.                            | The matching job application is deleted successfully and the data file is updated.          | **PASS — Job application deleted successfully.**                                    | [TC-04 screenshot](https://chatgpt.com/c/evidence/TC-03-delete-happy.png)      |
| TC-05 | `delete_job_application`    | Reset `data/job-applications.json` with existing applications.                                                                               | Company: `nextflow`; Job title: `Ai engineer`; Confirm: checked.                                | An application-not-found error is returned and existing data remains unchanged.             | **PASS — No job application was found for the specified company and job title.**    | [TC-05 screenshot](https://chatgpt.com/c/evidence/TC-04-delete-not-found.png)  |
| TC-06 | `update_application_status` | Reset `data/job-applications.json` with an existing application.                                                                             | Use valid input with an existing application and a valid status such as `Interview`.            | The application's status is updated successfully.                                           |                                                                                     |                                                                                |
| TC-07 | `update_application_status` | Reset `data/job-applications.json` with an existing application.                                                                             | Submit an invalid status value.                                                                 | A validation error is returned and the application's status remains unchanged.              |                                                                                     |                                                                                |
| TC-08 | `delete_job_application`    | Temporarily replace the fixture data with an empty JSON array `[]`.                                                                          | Company: `Google`; Job title: `Software Engineer`; Confirm: checked.                            | The tool handles empty data safely and returns an appropriate response without crashing.    | **PASS — No job application was found and the tool handled the empty data safely.** | [TC-08 screenshot](https://chatgpt.com/c/evidence/TC-07-delete-empty-data.png) |
| TC-09 | `update_application_status` | Simulate a slow or unavailable file operation that exceeds the configured timeout.                                                           | Attempt to update an application's status while the file operation is unavailable or times out. | A timeout/error response is returned and the tool does not hang indefinitely.               |                                                                                     |                                                                                |

## Fixture Reset

After each test that modifies `data/job-applications.json`, restore the fixture to its original known state before running the next test.

The happy-path tests should reuse the existing files in `examples/*.json`.

For the empty-data test, temporarily set the fixture to:

```json
[]
```

After completing TC-08, restore the normal fixture data.

The `result` and `evidence` columns for the remaining tests will be completed during the manual test execution.
