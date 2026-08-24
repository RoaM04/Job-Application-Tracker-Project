# Six-Week Project Reflection

**Name:** Marwa Faqeeh

**Project:** Job Application Tracker MCP

## What I Shipped

During the six-week project, I worked as part of the team to build the Job Application Tracker MCP server using TypeScript, MCP, and Zod.

My main technical contributions were implementing three MCP tools across different priorities:

* `update_application_status` — a P0 tool that allows users to change the status of an existing job application, with validation for the allowed statuses.
* `list_job_applications` — a P1 tool that retrieves the stored job applications and makes it easier to view the current application data.
* `search_applications_by_date_range` — a P2 tool that allows users to find job applications within a specific date range.

I worked on the tool schemas, implementation, validation, and testing to make sure these tools handled both valid and invalid inputs correctly. I also tested the tools using MCP Inspector and worked with the team on integrating them into the final project.

Besides the tool development, I gained practical experience with Git branches, pull requests, merging changes, resolving conflicts, project documentation, and preparing the MCP server for the final Claude Desktop demo.

## What Was Hard

One of the hardest parts for me was testing the project in a way that covered more than just the successful cases. I had to think about what should happen when users provide missing, invalid, duplicate, or unexpected data and make sure the results were documented clearly.

I also faced challenges while working with Git and the shared repository, especially when different branches contained changes to the same files. Resolving conflicts and making sure my changes were not lost taught me to check the repository status carefully and understand the difference between local and remote changes.

Another challenge for me was implementing tools with different requirements and priorities. For example, update_application_status had to strictly validate the allowed statuses, while search_applications_by_date_range required handling date inputs and range logic correctly. Making sure each tool returned the expected results while also handling invalid inputs helped me better understand how to design reliable MCP tools.

These experiences helped me become more comfortable with debugging, testing, Git workflows, and understanding how different parts of a software project connect together.

# Resume Bullet

**Developed three MCP tools (update_application_status, list_job_applications, and search_applications_by_date_range) using TypeScript, MCP, and Zod, with input validation and date-range handling, contributing to a public GitHub project and live Claude Desktop demo.**

## LinkedIn-Style Reflection

Over the past six weeks, I had the opportunity to work with a team on building a Job Application Tracker using the Model Context Protocol (MCP), TypeScript, and Zod.

During the project, I developed three MCP tools: update_application_status, list_job_applications, and search_applications_by_date_range. I also worked on validation, testing, Git collaboration, and integrating the tools into the final project and Claude Desktop demo.

This experience helped me better understand how to build reliable tools, work with an MCP server, and contribute to a real software project as part of a team.

## What I Would Improve Next

If I had another two weeks to continue the project, I would integrate a job-search API to retrieve real job opportunities based on keywords and location. Users could then save selected opportunities directly to the Job Application Tracker instead of entering all the information manually.

## Mentor Thanks

I would like to thank our mentors for their guidance and feedback throughout the six-week program. Their feedback helped me improve my understanding of MCP, testing, Git workflows, documentation, and preparing a project for a real demonstration.
