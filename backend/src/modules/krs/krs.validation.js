import { z } from "zod";

export const createKrsSchema = z.object({
  academicYearId: z.string().uuid("Invalid academic year ID"),
});

export const addClassToKrsSchema = z.object({
  classId: z.string().uuid("Invalid class ID"),
});

export const removeClassFromKrsSchema = z.object({
  krsDetailId: z.string().uuid("Invalid KRS detail ID"),
});

export const approveKrsSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().optional(),
});
