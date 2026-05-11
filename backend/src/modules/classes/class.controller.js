import * as classService from "./class.service.js";
import * as studentRepository from "../students/student.repository.js";
import { classIdParamSchema } from "./class.validation.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const getAvailableClasses = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get student's study program
    let studyProgramId = null;
    const studentId = await studentRepository.getStudentIdByUserId(userId);

    if (studentId) {
      studyProgramId =
        await studentRepository.getStudyProgramIdByStudentId(studentId);
    }

    const classes =
      await classService.getAvailableClassesService(studyProgramId);
    successResponse(
      res,
      200,
      "Available classes retrieved successfully",
      classes,
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getClassDetails = async (req, res) => {
  try {
    const { classId } = classIdParamSchema.parse(req.params);
    const classDetails = await classService.getClassDetailsService(classId);
    successResponse(
      res,
      200,
      "Class details retrieved successfully",
      classDetails,
    );
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }

    errorResponse(res, 404, error.message);
  }
};
