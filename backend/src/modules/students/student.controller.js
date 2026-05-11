import * as studentService from "./student.service.js";
import * as studentRepository from "./student.repository.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const studentId = await studentRepository.getStudentIdByUserId(userId);

    if (!studentId) {
      return errorResponse(res, 404, "Student profile not found");
    }

    const profile = await studentService.getProfileService(studentId);
    successResponse(
      res,
      200,
      "Student profile retrieved successfully",
      profile,
    );
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};
