import * as lecturerRepository from "./lecturer.repository.js";

export const getProfileService = async (lecturerId) => {
  const profile = await lecturerRepository.getLecturerById(lecturerId);

  if (!profile) {
    throw new Error("Lecturer not found");
  }

  return profile;
};

export const getProfileByUserIdService = async (userId) => {
  const profile = await lecturerRepository.getLecturerByUserId(userId);

  if (!profile) {
    throw new Error("Lecturer not found");
  }

  return profile;
};
