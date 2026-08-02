import {
  readJobApplications,
  writeJobApplications,
} from "./job-applications-file.js";

import type { JobApplication } from "../schemas/job-application.js";

export async function deleteJobApplication(
  company: string,
  jobTitle: string
): Promise<JobApplication> {
  const applications = await readJobApplications();

  const applicationIndex = applications.findIndex(
    (application) =>
      application.company.toLowerCase() ===
        company.trim().toLowerCase() &&
      application.jobTitle.toLowerCase() ===
        jobTitle.trim().toLowerCase()
  );

  if (applicationIndex === -1) {
    throw new Error(
      `Job application for '${jobTitle}' at '${company}' was not found.`
    );
  }

  const [deletedApplication] = applications.splice(
    applicationIndex,
    1
  );

  await writeJobApplications(applications);

  return deletedApplication;
}