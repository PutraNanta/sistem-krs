import * as studentRepository from "./student.repository.js";

export const getProfileService = async (studentId) => {
  const profile = await studentRepository.getStudentProfile(studentId);

  if (!profile) {
    throw new Error("Student not found");
  }

  return profile;
};
