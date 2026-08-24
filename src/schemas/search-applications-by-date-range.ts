import * as z from "zod/v4";

const validDate = z.string().refine(
  (date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return false;
    }

    const [year, month, day] = date.split("-").map(Number);

    if (year === 0 || month < 1 || month > 12 || day < 1) {
      return false;
    }

    const daysInMonth = new Date(
      Date.UTC(year, month, 0)
    ).getUTCDate();

    return day <= daysInMonth;
  },
  {
    message: "Invalid date. Use a valid date in YYYY-MM-DD format.",
  }
);

export const searchApplicationsByDateRangeInputSchema = z
  .object({
    startDate: validDate,
    endDate: validDate,
  })
  .refine(
    ({ startDate, endDate }) => startDate <= endDate,
    {
      message: "Start date must be before or equal to end date.",
      path: ["endDate"],
    }
  );