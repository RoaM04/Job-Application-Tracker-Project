import { readFile } from "node:fs/promises";

export async function readFileWithTimeout(
  filePath: string,
  timeoutMs = 1000
): Promise<string> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await readFile(filePath, {
      encoding: "utf-8",
      signal: controller.signal,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      throw new Error(
        `Reading the data file timed out after ${timeoutMs} ms`
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}