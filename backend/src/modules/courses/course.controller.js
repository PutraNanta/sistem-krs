import * as courseService from "./course.service.js";
import { getCourseByIdSchema } from "./course.validation.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const getCourses = async (req, res) => {
  try {
    const studyProgramId = req.query.studyProgramId || null;
    const courses = await courseService.getCoursesService(studyProgramId);

    successResponse(res, 200, "Courses retrieved successfully", courses);
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = getCourseByIdSchema.parse(req.params);
    const course = await courseService.getCourseByIdService(courseId);

    successResponse(res, 200, "Course retrieved successfully", course);
  } catch (error) {
    if (error.name === "ZodError") {
      return errorResponse(res, 400, "Validation error", error.errors);
    }

    errorResponse(res, 404, error.message);
  }
};
