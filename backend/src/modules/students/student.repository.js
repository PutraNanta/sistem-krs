import pool from "../../config/db.js";

export const getStudentProfile = async (studentId) => {
  const result = await pool.query(
    `SELECT s.*, u.email, u.name, sp.name as study_program_name, sp.max_sks
     FROM students s
     JOIN users u ON s.user_id = u.id
     JOIN study_programs sp ON s.study_program_id = sp.id
     WHERE s.id = $1`,
    [studentId],
  );
  return result.rows[0] || null;
};

export const getStudentIdByUserId = async (userId) => {
  const result = await pool.query(
    "SELECT id FROM students WHERE user_id = $1",
    [userId],
  );
  return result.rows[0]?.id || null;
};

export const getStudyProgramIdByStudentId = async (studentId) => {
  const result = await pool.query(
    "SELECT study_program_id FROM students WHERE id = $1",
    [studentId],
  );

  return result.rows[0]?.study_program_id || null;
};
