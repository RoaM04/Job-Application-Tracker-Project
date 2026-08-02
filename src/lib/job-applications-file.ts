import path from "node:path";

import { readFileWithTimeout } from "./ResponseFile.js";

import {
  jobApplicationsFileSchema,
  type JobApplication,
} from "../schemas/job-application.js";
import { mkdir, writeFile } from "node:fs/promises";

const DATA_DIRECTORY_PATH = path.resolve(
  process.cwd(),
  "data"
);

const DATA_FILE_PATH = path.join(
  DATA_DIRECTORY_PATH,
  "job-applications.json"
);

export async function readJobApplications(): Promise<
  JobApplication[]
> {
  try {
    const fileContent = await readFileWithTimeout(
      DATA_FILE_PATH,
      1000
    );

    if (!fileContent.trim()) {
      return [];
    }

    let parsedJson: unknown;

    try {
      parsedJson = JSON.parse(fileContent);
    } catch (error) {
      console.error(
        "[readJobApplications] Invalid JSON format:",
        error
      );

      throw new Error(
        "The job applications file contains invalid JSON."
      );
    }

    const validationResult =
      jobApplicationsFileSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error(
        "[readJobApplications] Invalid data structure:",
        validationResult.error
      );

      throw new Error(
        "The job applications file contains invalid application data."
      );
    }

    return validationResult.data;
  } catch (error) {
    const fileError = error as NodeJS.ErrnoException;

    if (fileError.code === "ENOENT") {
      console.error(
        "[readJobApplications] Data file was not found:",
        DATA_FILE_PATH
      );

      return [];
    }

    console.error(
      "[readJobApplications] Failed:",
      error
    );

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "Unable to read the job applications data."
    );
  }
}
export async function writeJobApplications(
  applications: JobApplication[]
): Promise<void> {
  const validationResult =
    jobApplicationsFileSchema.safeParse(applications);

  if (!validationResult.success) {
    console.error(
      "[writeJobApplications] Invalid application data:",
      validationResult.error
    );

    throw new Error(
      "Cannot save invalid job application data."
    );
  }

  try {
    await mkdir(DATA_DIRECTORY_PATH, {
      recursive: true,
    });

    await writeFile(
      DATA_FILE_PATH,
      JSON.stringify(validationResult.data, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error(
      "[writeJobApplications] Failed:",
      error
    );

    throw new Error(
      "Unable to save the job applications data."
    );
  }
}