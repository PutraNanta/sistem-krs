import * as lecturerRepository from "./lecturer.repository.js";

export const getProfileService = async (lecturerId) => {
  const profile = await lecturerRepository.getLecturerById(lecturerId);

  if (!profile) {
    throw new Error("Lecturer not found");
  }

  return profile;
};
