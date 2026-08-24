# Six-Week Project Reflection

**Name:** Shaimaa Dar Taha

**Project:** Job Application Tracker MCP

## What I Shipped

During the six-week project, I contributed to a Job Application Tracker built with the Model Context Protocol (MCP), TypeScript, and Zod.

I designed and implemented four MCP tools:

* `add_job_application` — adds a new job application with input validation and duplicate detection.
* `get_application_statistics` — provides statistics about the stored job applications.
* `update_job_application_details` — updates the details of an existing job application with validation.
* `search_job_applications` — searches stored applications based on relevant criteria.

I also worked on improving the reliability and security of the tools by adding input validation, handling invalid data and errors, validating dates and URLs, preventing duplicate applications, and protecting access to the application's data files.

I tested the tools during development and prepared them for use through MCP Inspector and Claude Desktop. I also gained practical experience with Git branches, commits, pull requests, peer review, and project documentation.

## What Was Hard

One of the most challenging parts for me was making the tools handle invalid or unexpected input correctly instead of only working for valid cases.

For example, `add_job_application` needed to handle duplicate applications, invalid dates, restricted URLs, and invalid input. I also had to troubleshoot local MCP configuration issues involving Windows paths, Node.js, `tsx`, and connecting the local server to Claude Desktop.

These challenges helped me understand that building an MCP tool is not just about implementing its main functionality. Validation, error handling, security, testing, and integration are also important parts of building a reliable tool.

## Resume Bullet

* **Built four MCP tools (`add_job_application`, `get_application_statistics`, `update_job_application_details`, and `search_job_applications`) using TypeScript, Zod, and MCP, adding input validation, duplicate detection, error handling, and security controls; contributed to a public GitHub project and live Claude Desktop demo.**

## LinkedIn-Style Reflection

Over the past six weeks, I worked on a Job Application Tracker using MCP, TypeScript, and Zod. I built four MCP tools for adding, updating, searching, and analyzing job applications.

Beyond implementing the core functionality, I worked on validation, duplicate detection, error handling, security, testing, Git workflows, and integrating the local MCP server with Claude Desktop.

One of my biggest lessons from this project was that making a tool work is only the first step. Making it reliable, secure, well-tested, and easy to use is just as important.

## What I Would Improve Next

If I continued working on the project for another two weeks, I would focus on expanding the automated test coverage for all four tools.

I would add more tests for edge cases, validation failures, security scenarios, and unexpected input. I would also integrate these tests into a CI workflow so they run automatically whenever changes are pushed or a pull request is created.

## Mentor Thanks

I would like to thank my mentors for their guidance, feedback, and support throughout these six weeks. Their feedback helped me improve not only the functionality of my tools, but also the way I approach validation, security, testing, documentation, and debugging.

I especially appreciated the feedback that pushed me to think beyond simply making the code work and to build tools that are more reliable and ready to be used in a real project.
