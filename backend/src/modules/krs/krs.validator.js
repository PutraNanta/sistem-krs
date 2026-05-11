import pool from "../../config/db.js";

/**
 * Validate if student hasn't exceeded max SKS with a new class
 * @param {string} studentId - Student ID
 * @param {string} krsId - KRS ID
 * @param {string} newClassId - New class to add
 */
export const validateMaxSks = async (studentId, krsId, newClassId) => {
  try {
    // Get student's max SKS from study program
    const studentResult = await pool.query(
      `SELECT sp.max_sks FROM students s
       JOIN study_programs sp ON s.study_program_id = sp.id
       WHERE s.id = $1`,
      [studentId],
    );

    if (studentResult.rows.length === 0) {
      throw new Error("Student not found");
    }

    const maxSks = studentResult.rows[0].max_sks;

    // Get current total SKS in KRS
    const currentSksResult = await pool.query(
      `SELECT COALESCE(SUM(c.sks), 0) as total_sks
       FROM krs_details kd
       JOIN classes cl ON kd.class_id = cl.id
       JOIN courses c ON cl.course_id = c.id
       WHERE kd.krs_id = $1`,
      [krsId],
    );

    const currentSks = currentSksResult.rows[0]?.total_sks || 0;

    // Get new class SKS
    const newClassResult = await pool.query(
      `SELECT c.sks FROM classes cl
       JOIN courses c ON cl.course_id = c.id
       WHERE cl.id = $1`,
      [newClassId],
    );

    if (newClassResult.rows.length === 0) {
      throw new Error("Class not found");
    }

    const newClassSks = newClassResult.rows[0].sks;
    const totalSks = currentSks + newClassSks;

    if (totalSks > maxSks) {
      throw new Error(
        `Total SKS (${totalSks}) exceeds maximum allowed (${maxSks})`,
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate if class capacity is available
 * @param {string} classId - Class ID
 */
export const validateClassCapacity = async (classId) => {
  try {
    const result = await pool.query(
      `SELECT capacity, current_enrollment FROM classes WHERE id = $1`,
      [classId],
    );

    if (result.rows.length === 0) {
      throw new Error("Class not found");
    }

    const { capacity, current_enrollment } = result.rows[0];

    if (current_enrollment >= capacity) {
      throw new Error(`Class is full (${current_enrollment}/${capacity})`);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate if student hasn't already chosen the same course
 * @param {string} krsId - KRS ID
 * @param {string} classId - Class to check
 */
export const validateDuplicateClass = async (krsId, classId) => {
  try {
    // Get the course of the new class
    const newCourseResult = await pool.query(
      `SELECT course_id FROM classes WHERE id = $1`,
      [classId],
    );

    if (newCourseResult.rows.length === 0) {
      throw new Error("Class not found");
    }

    const newCourseId = newCourseResult.rows[0].course_id;

    // Check if student already has this course in their KRS
    const duplicateResult = await pool.query(
      `SELECT COUNT(*) as count FROM krs_details kd
       JOIN classes cl ON kd.class_id = cl.id
       WHERE kd.krs_id = $1 AND cl.course_id = $2`,
      [krsId, newCourseId],
    );

    if (duplicateResult.rows[0].count > 0) {
      throw new Error("Student has already chosen this course");
    }

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate if new class has schedule conflict with existing classes
 * @param {string} krsId - KRS ID
 * @param {string} classId - Class to check
 */
export const validateScheduleConflict = async (krsId, classId) => {
  try {
    // Get schedules of new class
    const newScheduleResult = await pool.query(
      `SELECT day_of_week, start_time, end_time FROM class_schedules
       WHERE class_id = $1`,
      [classId],
    );

    if (newScheduleResult.rows.length === 0) {
      // No schedule conflict if no schedules defined
      return true;
    }

    const newSchedules = newScheduleResult.rows;

    // Get existing class schedules in KRS
    const existingResult = await pool.query(
      `SELECT cs.day_of_week, cs.start_time, cs.end_time
       FROM krs_details kd
       JOIN class_schedules cs ON kd.class_id = cs.class_id
       WHERE kd.krs_id = $1`,
      [krsId],
    );

    const existingSchedules = existingResult.rows;

    // Check for conflicts
    for (const newSched of newSchedules) {
      for (const existSched of existingSchedules) {
        // Check if same day
        if (newSched.day_of_week === existSched.day_of_week) {
          // Check if time overlaps
          if (
            newSched.start_time < existSched.end_time &&
            newSched.end_time > existSched.start_time
          ) {
            throw new Error("Schedule conflict detected with existing classes");
          }
        }
      }
    }

    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate if KRS can be edited (not approved)
 * @param {string} krsId - KRS ID
 */
export const validateKrsEditable = async (krsId) => {
  try {
    const result = await pool.query(`SELECT status FROM krs WHERE id = $1`, [
      krsId,
    ]);

    if (result.rows.length === 0) {
      throw new Error("KRS not found");
    }

    const { status } = result.rows[0];

    if (status === "approved") {
      throw new Error("Cannot edit approved KRS");
    }

    if (status === "rejected") {
      throw new Error("Cannot edit rejected KRS");
    }

    return true;
  } catch (error) {
    throw error;
  }
};
