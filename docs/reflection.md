# Six-Week Reflection — Job Application Tracker MCP

## Wins

Over the six weeks, we successfully built and shipped a local **Job Application Tracker MCP** server.

Our main achievements were:

* Built a working MCP server using **TypeScript** and the MCP SDK.
* Implemented multiple MCP tools for managing job applications.
* Added input validation using **Zod**.
* Added features for adding, deleting, searching, listing, and updating job applications.
* Created a local JSON-based data store.
* Added validation, path-safety checks, timeouts, and output limits.
* Created a manual test plan with evidence for important test cases.
* Connected the MCP server to Claude Desktop for natural-language tool calls.
* Completed a fresh-clone verification.
* Published the project as a public GitHub repository.
* Created the `v1.0.0` release tag and prepared the project for the final demo.

## Blockers and Challenges

One of the biggest challenges was getting the local MCP server to work correctly with Claude Desktop. We had issues with the working directory and server configuration, which caused errors such as the server looking for files in the wrong location.

We also had to deal with validation and data-safety issues, including duplicate applications, invalid inputs, file paths, and empty data.

Another challenge was making sure the project could be cloned and run from a fresh environment rather than only working on our development machine.

These challenges helped us understand that building a working feature is only one part of software engineering. Testing, validation, documentation, configuration, and deployment are also important.

## Resume Bullet

> Built and shipped a local Job Application Tracker MCP server using **TypeScript, MCP, and Zod**, implementing **10 MCP tools** for managing job applications, with validated local data handling, testing, and a public GitHub release with a live demo.

## LinkedIn-Style Reflection

Over the past six weeks, I worked with my team on building and shipping a **Job Application Tracker MCP** as part of the NextFlows Academy training.

We built a local MCP server using **TypeScript, MCP, and Zod** that allows an AI assistant to manage job applications through natural-language requests. During the project, I gained practical experience with MCP tools, input validation, testing, Git/GitHub workflows, documentation, Claude Desktop integration, and preparing a project for a public release.

The project was challenging at times, especially when debugging the local server configuration and making sure the project worked correctly from a fresh clone. However, these challenges gave me a better understanding of what it takes to move a software project from an idea to a working, tested, and demonstrable product.

## One Improvement for the Next Two Weeks

If we continued working on the project, the first improvement I would make would be replacing the local JSON storage with a proper database.

This would make the application more scalable and reliable and would provide a stronger foundation for adding features such as application analytics, reminders, advanced filtering, and calendar integration.

## Thank You

Thank you to our mentor for the guidance, feedback, and support throughout the six-week training. The feedback during development and demos helped us improve not only the project itself but also our understanding of how to build, test, document, and present a software project professionally.
