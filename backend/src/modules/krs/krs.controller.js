import {
  createKrsSchema,
  addClassToKrsSchema,
  removeClassFromKrsSchema,
  approveKrsSchema,
} from "./krs.validation.js";
import * as krsService from "./krs.service.js";
import * as studentRepository from "../students/student.repository.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const createKrs = async (req, res) => {
  try {
    const { academicYearId } = createKrsSchema.parse(req.body);
    const userId = req.user.userId;

    const studentId = await studentRepository.getStudentIdByUserId(userId);

    if (!studentId) {
      return errorResponse(res, 404, "Student profile not found");
    }

    const krs = await krsService.createKrsService(studentId, academicYearId);
    successResponse(res, 201, "KRS created successfully", krs);
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }
    errorResponse(res, 400, error.message);
  }
};

export const addClassToKrs = async (req, res) => {
  try {
    const { classId } = addClassToKrsSchema.parse(req.body);
    const { krsId } = req.params;

    const krsDetail = await krsService.addClassToKrsService(krsId, classId);
    successResponse(res, 201, "Class added to KRS successfully", krsDetail);
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }
    errorResponse(res, 400, error.message);
  }
};

export const removeClassFromKrs = async (req, res) => {
  try {
    const { removeClassFromKrsSchema: schema } =
      await import("./krs.validation.js");
    const { krsDetailId } = req.params;
    const { classId } = req.body;

    await krsService.removeClassFromKrsService(krsDetailId, classId);
    successResponse(res, 200, "Class removed from KRS successfully");
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }
    errorResponse(res, 400, error.message);
  }
};

export const submitKrs = async (req, res) => {
  try {
    const { krsId } = req.params;

    const updatedKrs = await krsService.submitKrsService(krsId);
    successResponse(res, 200, "KRS submitted successfully", updatedKrs);
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

export const getCurrentKrs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = await studentRepository.getStudentIdByUserId(userId);

    if (!studentId) {
      return errorResponse(res, 404, "Student profile not found");
    }

    const krs = await krsService.getCurrentKrsService(studentId);
    successResponse(res, 200, "Current KRS retrieved successfully", krs);
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

export const getKrsHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = await studentRepository.getStudentIdByUserId(userId);

    if (!studentId) {
      return errorResponse(res, 404, "Student profile not found");
    }

    const history = await krsService.getKrsHistoryService(studentId);
    successResponse(res, 200, "KRS history retrieved successfully", history);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const approveKrs = async (req, res) => {
  try {
    const { krsId } = req.params;
    const { status, rejectionReason } = approveKrsSchema.parse(req.body);
    const approvedById = req.user.userId;

    const updatedKrs = await krsService.approveKrsService(
      krsId,
      approvedById,
      status,
      rejectionReason,
    );
    successResponse(res, 200, `KRS ${status} successfully`, updatedKrs);
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }
    errorResponse(res, 400, error.message);
  }
};

export const getPendingKrs = async (req, res) => {
  try {
    const lecturerId = req.user.userId;

    // Get lecturer ID from user
    const lecturerResult = await (
      await import("../../config/db.js")
    ).default.query("SELECT id FROM lecturers WHERE user_id = $1", [
      lecturerId,
    ]);

    if (lecturerResult.rows.length === 0) {
      return errorResponse(res, 404, "Lecturer profile not found");
    }

    const lecturer = lecturerResult.rows[0];
    const pendingKrs = await krsService.getPendingKrsService(lecturer.id);
    successResponse(res, 200, "Pending KRS retrieved successfully", pendingKrs);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
