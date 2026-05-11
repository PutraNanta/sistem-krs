import * as lecturerService from "./lecturer.service.js";
import { getLecturerByIdSchema } from "./lecturer.validation.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profile = await lecturerService.getProfileByUserIdService(userId);

    successResponse(res, 200, "Lecturer profile retrieved successfully", profile);
  } catch (error) {
    errorResponse(res, 404, error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const { lecturerId } = getLecturerByIdSchema.parse(req.params);
    const lecturer = await lecturerService.getProfileService(lecturerId);

    successResponse(res, 200, "Lecturer retrieved successfully", lecturer);
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }

    errorResponse(res, 404, error.message);
  }
};
