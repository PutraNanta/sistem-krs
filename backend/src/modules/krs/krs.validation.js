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
  status: z.literal("approved").default("approved"),
});

export const rejectKrsSchema = z.object({
  rejectionReason: z
    .string()
    .min(5, "Rejection reason must be at least 5 characters"),
});
