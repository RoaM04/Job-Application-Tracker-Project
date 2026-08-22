# Security Policy

## Supported Versions

This repository currently supports the latest version on the `main` branch.

| Version | Supported |
| ------- | --------- |
| main    | Yes       |

## Reporting a Security Issue

Please report security issues privately to the project mentor by email:

Mjaradat@nextflows.ai

Do not open a public issue for security vulnerabilities.

When reporting an issue, include:

- A short description of the issue
- Steps to reproduce it
- The affected tool or input
- Any relevant screenshots or error messages

## Security Controls

### `add_job_application`

The `add_job_application` tool applies the following security controls:

- [x] Input strings are trimmed and capped at 100 characters.
- [x] Company and job title fields cannot be empty.
- [x] Application dates must use `YYYY-MM-DD` format and a year between `1900` and `2100`.
- [x] Application links are restricted to `http://` and `https://`.
- [x] Application data is validated before being written.
- [x] Stored application data is validated before being returned.
- [x] Duplicate job applications are rejected.
- [x] File access is restricted to the data directory.
- [x] Reading the data file has a 1-second timeout.
- [x] Empty data files are handled safely.
- [x] Invalid JSON is rejected.
- [x] Invalid application data is rejected.
- [x] Tool errors return short, user-safe messages.

### `delete_job_application`

The `delete_job_application` tool includes the following protections:

- [x] Input validation: `company` and `jobTitle` are required and limited to 100 characters.
- [x] Input trimming: Leading and trailing whitespace is removed before processing.
- [x] Case normalization: Company names and job titles are compared case-insensitively.
- [x] Controlled errors: Missing applications return a short error message instead of exposing internal details.
- [x] Safe file handling: The tool uses the existing validated file read/write helpers.
- [x] Ambiguous match protection: If multiple applications have the same company name and job title, deletion is refused to prevent deleting the wrong application.

### `update_application_status`

The `update_application_status` tool applies the following security controls:

- [x] Input strings are trimmed and capped at 100 characters.
- [x] Company and job title fields are required.
- [x] Status values are restricted to the allowed application statuses.
- [x] Application data is validated before being updated.
- [x] Stored application data is validated before being returned.
- [x] File access is restricted to the data directory.
- [x] Reading the data file has a timeout.
- [x] Empty data files are handled safely.
- [x] Invalid JSON is rejected.
- [x] Invalid application data is rejected.
- [x] Tool errors return short, user-safe messages without exposing internal details.