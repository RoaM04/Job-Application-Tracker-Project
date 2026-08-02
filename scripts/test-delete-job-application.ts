import { deleteJobApplication } from "../src/lib/job-applications.js";

async function testDeleteJobApplication(): Promise<void> {
  try {
    const deletedApplication =
      await deleteJobApplication(
        "Google",
        "Software Engineer"
      );

    console.log({
      message:
        `Job application for '${deletedApplication.jobTitle}' ` +
        `at '${deletedApplication.company}' has been deleted successfully.`,
    });
  } catch (error) {
    console.error({
      error:
        error instanceof Error
          ? error.message
          : "Unexpected delete error.",
    });
  }
}

testDeleteJobApplication();