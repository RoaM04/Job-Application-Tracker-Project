# Six-Week Project Reflection

**Name:** Roa Makhtoob
**Project:** Job Application Tracker MCP

## What I Shipped

During the six-week project, I developed 4 MCP tools for the Job Application Tracker:

* `delete_job_application` — deletes an application using the company and job title instead of an ID. I chose this approach because a user normally would not know the database ID of their application, making company and job title more practical to use.
* `add_job_application_note` — adds a note to an existing job application.
* `remove_job_application_note` — removes a note from an application.
* `get_job_application_details` — retrieves the full application details using the company or job title.

I am proud of all four tools because they were designed from the user's point of view, especially making it easier to find and manage an application without needing to know internal IDs.

## What Was Difficult

At the beginning of the project, especially before our first face-to-face meeting, understanding MCP and how everything connected together was difficult for me. Designing the Zod schemas and validation also took time until our mentor explained the concepts and helped us understand how to approach them.

Connecting the MCP server to Claude Desktop was another challenge and took me several hours to get working correctly. I also learned that implementing a tool is not only about the successful case. I had to think about possible errors, invalid inputs, missing data, duplicates, and other edge cases.

Git was another challenge, especially working with branches, pull requests, merges, and conflicts. Even after learning the process, resolving conflicts took me some time to fully understand. Setting up repository protection was also a new experience, including making sure changes could only reach `main` through pull requests and team approval.

## What I Learned

Throughout the six weeks, I became much more comfortable with:

* Understanding how MCP servers and MCP tools work.
* Designing Zod schemas and input validation.
* Working with TypeScript and the MCP SDK.
* Using MCP Inspector and connecting the server with Claude Desktop.
* Working with Git branches, pull requests, merges, and conflict resolution.
* Applying repository security and branch protection.
* Working as part of a team on a shared codebase.
* Thinking more carefully about error handling and edge cases instead of only focusing on the happy path.

## Resume Bullet

> Developed 4 MCP tools — `delete_job_application`, `add_job_application_note`, `remove_job_application_note`, and `get_job_application_details` — using MCP, TypeScript, and Zod as part of a team project, contributing to a public repository and live Demo Day presentation.

## LinkedIn-Style Paragraph

I got to work with my team for six weeks on building a Job Application Tracker using MCP, TypeScript, and Zod. I developed four MCP tools: delete_job_application, add_job_application_note, remove_job_application_note, and get_job_application_details. I also became more comfortable with MCP Inspector, Claude Desktop, Git, pull requests, and working on a shared codebase. Some parts were challenging, especially understanding MCP concepts and dealing with Git conflicts, but working through these challenges helped me improve both my technical and teamwork skills. I’m happy that after six weeks of work, we were able to complete the project, make the repository public, and present our work during Demo Day.


## One Improvement I Would Make

If I continued working on the project for the next two weeks, I would improve the data layer by replacing the local JSON file with a real database or a proper external API. This would make the application more scalable and reliable as the number of job applications grows. I would also consider adding more useful MCP tools after improving the underlying data storage.

## Thank You

Thank you to all our mentors for their support, feedback, and guidance throughout the six weeks. A special thank you to Mohammad Jaradat for always being there during our meetings, explaining the concepts clearly, making sure we understood what was expected from us, and following up with us step by step throughout the project. His support really helped us understand the work better and keep moving forward.
