import {
  readJobApplications,
  writeJobApplications,
  withJobApplicationsWriteLock,
} from "../src/lib/job-applications-file.js";

async function addTestApplication(
  company: string,
  jobTitle: string
) {
  return withJobApplicationsWriteLock(async () => {
    console.log(`[${company}] LOCK ACQUIRED`);

    const applications = await readJobApplications();

    console.log(
      `[${company}] READ ${applications.length} applications`
    );

    // Artificial delay to make concurrency visible
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    applications.push({
      company,
      jobTitle,
      applicationDate: "2026-08-14",
      applicationLink: `https://example.com/${company}`,
      status: "Applied",
      notes: [],
    });

    await writeJobApplications(applications);

    console.log(
      `[${company}] WRITE COMPLETE (${applications.length} applications)`
    );
  });
}

async function main() {
  console.log("Starting concurrent test...");

  await Promise.all([
    addTestApplication(
      "Concurrency-Test-A",
      "Software Engineer A"
    ),
    addTestApplication(
      "Concurrency-Test-B",
      "Software Engineer B"
    ),
  ]);

  console.log("Both operations completed.");

  const applications = await readJobApplications();

  console.log("\nFinal applications:");
  console.log(
    applications.filter(
      (application) =>
        application.company.startsWith("Concurrency-Test-")
    )
  );
}

main().catch(console.error);