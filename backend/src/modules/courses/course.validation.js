import { z } from "zod";

export const getCourseByIdSchema = z.object({
  courseId: z.string().uuid("Invalid course ID"),
});
