import { z } from "zod";

export const classIdParamSchema = z.object({
  classId: z.string().uuid("Invalid class ID"),
});
