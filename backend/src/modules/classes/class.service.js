import * as classRepository from "./class.repository.js";

export const getAvailableClassesService = async (studyProgramId = null) => {
  const classes = await classRepository.getAvailableClasses(studyProgramId);
  return classes;
};

export const getClassDetailsService = async (classId) => {
  const classDetails = await classRepository.getClassById(classId);

  if (!classDetails) {
    throw new Error("Class not found");
  }

  return classDetails;
};
