import pool from "../../config/db.js";

/**
 * Validate if student hasn't exceeded max SKS with a new class
 * @param {string} studentId - Student ID
 * @param {string} krsId - KRS ID
 * @param {string} newClassId - New class to add
 */
export const validateMaxSks = async (studentId, krsId, newClassId) => {
  // Read student's SKS limit from their study program.
  const studentResult = await pool.query(
    `SELECT sp.max_sks
     FROM students s
     JOIN study_programs sp ON s.study_program_id = sp.id
     WHERE s.id = $1`,
    [studentId],
  );

  if (studentResult.rows.length === 0) {
    throw new Error("Student not found for SKS validation");
  }

  const maxSks = Number(studentResult.rows[0].max_sks);

  // Sum current SKS already chosen in this KRS.
  const currentSksResult = await pool.query(
    `SELECT COALESCE(SUM(c.sks), 0) AS total_sks
     FROM krs_details kd
     JOIN classes cl ON kd.class_id = cl.id
     JOIN courses c ON cl.course_id = c.id
     WHERE kd.krs_id = $1`,
    [krsId],
  );

  const currentSks = Number(currentSksResult.rows[0]?.total_sks || 0);

  // Read SKS for the class the student wants to add.
  const newClassResult = await pool.query(
    `SELECT c.sks
     FROM classes cl
     JOIN courses c ON cl.course_id = c.id
     WHERE cl.id = $1`,
    [newClassId],
  );

  if (newClassResult.rows.length === 0) {
    throw new Error("Class not found for SKS validation");
  }

  const newClassSks = Number(newClassResult.rows[0].sks);
  const totalSks = currentSks + newClassSks;

  if (totalSks > maxSks) {
    throw new Error(
      `Cannot add class. Total SKS would become ${totalSks}, exceeding max SKS ${maxSks}.`,
    );
  }

  return true;
};

/**
 * Validate if class capacity is available
 * @param {string} classId - Class ID
 */
export const validateClassCapacity = async (classId) => {
  // Ensure class still has available seats before insert.
  const result = await pool.query(
    `SELECT capacity, current_enrollment
     FROM classes
     WHERE id = $1`,
    [classId],
  );

  if (result.rows.length === 0) {
    throw new Error("Class not found for capacity validation");
  }

  const { capacity, current_enrollment: currentEnrollment } = result.rows[0];

  if (Number(currentEnrollment) >= Number(capacity)) {
    throw new Error(
      `Cannot add class. Class is full (${currentEnrollment}/${capacity}).`,
    );
  }

  return true;
};

/**
 * Validate if student hasn't already chosen the same course
 * @param {string} krsId - KRS ID
 * @param {string} classId - Class to check
 */
export const validateDuplicateClass = async (krsId, classId) => {
  // Prevent same course being selected twice in one KRS.
  const duplicateResult = await pool.query(
    `SELECT 1
     FROM krs_details kd
     JOIN classes existing_class ON kd.class_id = existing_class.id
     JOIN classes requested_class ON requested_class.id = $2
     WHERE kd.krs_id = $1
       AND existing_class.course_id = requested_class.course_id
     LIMIT 1`,
    [krsId, classId],
  );

  if (duplicateResult.rows.length > 0) {
    throw new Error(
      "Cannot add class. This course is already selected in the current KRS.",
    );
  }

  return true;
};

/**
 * Validate if new class has schedule conflict with existing classes
 * @param {string} krsId - KRS ID
 * @param {string} classId - Class to check
 */
export const validateScheduleConflict = async (krsId, classId) => {
  // Detect overlapping day/time between requested class and chosen classes.
  const conflictResult = await pool.query(
    `SELECT 1
     FROM class_schedules requested_schedule
     JOIN krs_details kd ON kd.krs_id = $1
     JOIN class_schedules existing_schedule
       ON existing_schedule.class_id = kd.class_id
      AND existing_schedule.day_of_week = requested_schedule.day_of_week
      AND requested_schedule.start_time < existing_schedule.end_time
      AND requested_schedule.end_time > existing_schedule.start_time
     WHERE requested_schedule.class_id = $2
     LIMIT 1`,
    [krsId, classId],
  );

  if (conflictResult.rows.length > 0) {
    throw new Error(
      "Cannot add class. Schedule conflicts with another class in current KRS.",
    );
  }

  return true;
};

/**
 * Validate if KRS can be edited (not approved)
 * @param {string} krsId - KRS ID
 */
export const validateKrsEditable = async (krsId) => {
  // Allow edit only while KRS is still draft.
  const result = await pool.query(`SELECT status FROM krs WHERE id = $1`, [
    krsId,
  ]);

  if (result.rows.length === 0) {
    throw new Error("KRS not found for edit validation");
  }

  const { status } = result.rows[0];

  if (status !== "draft") {
    throw new Error(
      `Cannot edit KRS. Current status is '${status}', only 'draft' can be modified.`,
    );
  }

  return true;
};
