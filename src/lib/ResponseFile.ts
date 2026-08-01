import { readFile } from "node:fs/promises";

export async function readFileWithTimeout(
  filePath: string,
  timeoutMs = 1000
): Promise<string> {
  let timeoutId: NodeJS.Timeout | undefined;

  try {
    return await Promise.race([
      readFile(filePath, "utf-8"),

      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(
            new Error(
              `Reading the data file timed out after ${timeoutMs} ms`
            )
          );
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}