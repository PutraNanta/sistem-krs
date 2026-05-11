import * as courseRepository from "./course.repository.js";

export const getCoursesService = async (studyProgramId = null) => {
  return courseRepository.getCourses(studyProgramId);
};

export const getCourseByIdService = async (courseId) => {
  const course = await courseRepository.getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};
