import * as z from "zod/v4";

export const searchApplicationsByDateRangeInputSchema =
  z.object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  });