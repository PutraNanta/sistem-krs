import { z } from "zod";

export const getLecturerByIdSchema = z.object({
  lecturerId: z.string().uuid("Invalid lecturer ID"),
});
