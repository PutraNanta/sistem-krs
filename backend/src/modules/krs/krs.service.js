import pool from "../../config/db.js";
import * as krsRepository from "./krs.repository.js";
import * as krsValidator from "./krs.validator.js";
import * as studentRepository from "../students/student.repository.js";

export const createKrsService = async (studentId, academicYearId) => {
  // Check if student already has KRS for this academic year
  const existingKrs = await krsRepository.getKrsByStudentAndYear(
    studentId,
    academicYearId,
  );

  if (existingKrs) {
    throw new Error("Student already has a KRS for this academic year");
  }

  const krs = await krsRepository.createKrs(studentId, academicYearId);
  return krs;
};

export const addClassToKrsService = async (krsId, classId) => {
  const krs = await krsRepository.getKrsById(krsId);

  if (!krs) {
    throw new Error("KRS not found");
  }

  // Validate KRS is editable
  await krsValidator.validateKrsEditable(krsId);

  // Validate class capacity
  await krsValidator.validateClassCapacity(classId);

  // Validate duplicate class
  await krsValidator.validateDuplicateClass(krsId, classId);

  // Validate schedule conflict
  await krsValidator.validateScheduleConflict(krsId, classId);

  // Validate max SKS
  await krsValidator.validateMaxSks(krs.student_id, krsId, classId);

  // Use transaction for adding class
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const krsDetail = await krsRepository.addClassToKrs(krsId, classId, client);
    await client.query("COMMIT");
    return krsDetail;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const removeClassFromKrsService = async (krsDetailId, classId) => {
  const krsDetail = await pool.query(
    "SELECT krs_id FROM krs_details WHERE id = $1",
    [krsDetailId],
  );

  if (krsDetail.rows.length === 0) {
    throw new Error("KRS detail not found");
  }

  const krsId = krsDetail.rows[0].krs_id;

  // Validate KRS is editable
  await krsValidator.validateKrsEditable(krsId);

  // Use transaction for removing class
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await krsRepository.removeClassFromKrs(krsDetailId, classId, client);
    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const submitKrsService = async (krsId) => {
  const krs = await krsRepository.getKrsById(krsId);

  if (!krs) {
    throw new Error("KRS not found");
  }

  // Validate KRS is editable
  await krsValidator.validateKrsEditable(krsId);

  // Validate KRS is not empty
  const krsDetails = await krsRepository.getKrsDetails(krsId);

  if (krsDetails.length === 0) {
    throw new Error("Cannot submit empty KRS. Please add at least one class.");
  }

  // Use transaction for submitting
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const updatedKrs = await krsRepository.submitKrs(krsId, client);
    await client.query("COMMIT");
    return updatedKrs;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getCurrentKrsService = async (studentId) => {
  const krs = await krsRepository.getCurrentKrs(studentId);

  if (!krs) {
    throw new Error("No active KRS found");
  }

  const krsDetails = await krsRepository.getKrsDetails(krs.id);
  const krsWithSks = await krsRepository.getKrsWithTotalSks(krs.id);

  return {
    ...krs,
    details: krsDetails,
    totalClasses: krsWithSks.total_classes,
    totalSks: krsWithSks.total_sks,
  };
};

export const getKrsHistoryService = async (studentId) => {
  const history = await krsRepository.getKrsHistory(studentId);

  return Promise.all(
    history.map(async (krs) => {
      const krsWithSks = await krsRepository.getKrsWithTotalSks(krs.id);
      return {
        ...krs,
        totalClasses: krsWithSks.total_classes,
        totalSks: krsWithSks.total_sks,
      };
    }),
  );
};

export const approveKrsService = async (
  krsId,
  approvedById,
  status,
  rejectionReason = null,
) => {
  const krs = await krsRepository.getKrsById(krsId);

  if (!krs) {
    throw new Error("KRS not found");
  }

  if (krs.status !== "submitted") {
    throw new Error("Only submitted KRS can be approved/rejected");
  }

  // Use transaction for approval
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    if (status === "rejected" && !rejectionReason) {
      throw new Error("Rejection reason is required");
    }

    const updatedKrs = await krsRepository.approveKrs(
      krsId,
      approvedById,
      status === "rejected" ? rejectionReason : null,
      client,
    );

    await client.query("COMMIT");
    return updatedKrs;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getPendingKrsService = async (lecturerId) => {
  const pendingKrs = await krsRepository.getPendingKrsForLecturer(lecturerId);

  return Promise.all(
    pendingKrs.map(async (krs) => {
      const krsDetails = await krsRepository.getKrsDetails(krs.id);
      const krsWithSks = await krsRepository.getKrsWithTotalSks(krs.id);

      return {
        ...krs,
        details: krsDetails,
        totalClasses: krsWithSks.total_classes,
        totalSks: krsWithSks.total_sks,
      };
    }),
  );
};
