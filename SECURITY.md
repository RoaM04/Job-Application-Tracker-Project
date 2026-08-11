# Security Policy

## Supported Versions

This repository is currently under active development.

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |

## Reporting a Vulnerability

If you find a security issue in this repository, please report it privately to the project mentor:

**[Mjaradat@nextflows.ai](mailto:Mjaradat@nextflows.ai)**

Please include:

* A short description of the issue
* Steps to reproduce it
* The affected tool or file
* Any relevant screenshots or error messages

Please do not publicly disclose the issue before it has been reviewed.

## Delete Tool Security Hardening

The Delete Job Application tool includes the following protections:

* **Input validation:** `company` and `jobTitle` are required and limited to 100 characters.
* **Input trimming:** Leading and trailing whitespace is removed before processing.
* **Case normalization:** Company names and job titles are compared case-insensitively.
* **Controlled errors:** Missing applications return a short error message instead of exposing internal details.
* **Safe file handling:** The tool uses the existing validated file read/write helpers.
* **Ambiguous match protection:** If multiple applications have the same company name and job title, deletion is refused to prevent deleting the wrong application.
