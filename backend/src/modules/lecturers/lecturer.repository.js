import pool from "../../config/db.js";

export const getLecturerById = async (lecturerId) => {
  const result = await pool.query(
    `SELECT l.*, u.email, u.name, sp.name as study_program_name
     FROM lecturers l
     JOIN users u ON l.user_id = u.id
     JOIN study_programs sp ON l.study_program_id = sp.id
     WHERE l.id = $1`,
    [lecturerId],
  );
  return result.rows[0] || null;
};

export const getLecturerByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT l.*, u.email, u.name, sp.name as study_program_name
     FROM lecturers l
     JOIN users u ON l.user_id = u.id
     JOIN study_programs sp ON l.study_program_id = sp.id
     WHERE l.user_id = $1`,
    [userId],
  );
  return result.rows[0] || null;
};
