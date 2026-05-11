import { z } from "zod";

export const studentIdParamSchema = z.object({
  studentId: z.string().uuid("Invalid student ID"),
});
