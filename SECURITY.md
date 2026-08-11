# Security Policy

## Supported Versions

This repository currently supports the latest version on the `main` branch.

| Version | Supported |
| ------- | --------- |
| main    | Yes       |

## Reporting a Security Issue

Please report security issues privately to the project mentor by email:

[Mjaradat@nextflows.ai](mailto:Mjaradat@nextflows.ai)

Do not open a public issue for security vulnerabilities.

When reporting an issue, include:

* A short description of the issue
* Steps to reproduce it
* The affected tool or input
* Any relevant error message

## Security Controls

The `update_application_status` tool applies the following security controls:

* Input strings are trimmed and capped at 100 characters.
* Company and job title fields are required.
* Status values are restricted to the allowed application statuses.
* Application data is validated before being updated.
* Stored application data is validated before being returned.
* File access is restricted to the data directory.
* Reading the data file has a timeout.
* Empty data files are handled safely.
* Invalid JSON is rejected.
* Invalid application data is rejected.
* Tool errors return short, user-safe messages without exposing internal details.
