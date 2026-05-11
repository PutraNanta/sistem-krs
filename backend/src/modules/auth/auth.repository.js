import pool from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0] || null;
};

export const findUserById = async (userId) => {
  const result = await pool.query(
    "SELECT id, email, name, role FROM users WHERE id = $1",
    [userId],
  );
  return result.rows[0] || null;
};

export const findStudentByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT s.*, u.email, u.name, sp.name as study_program_name, sp.max_sks
     FROM students s
     JOIN users u ON s.user_id = u.id
     JOIN study_programs sp ON s.study_program_id = sp.id
     WHERE s.user_id = $1`,
    [userId],
  );
  return result.rows[0] || null;
};
