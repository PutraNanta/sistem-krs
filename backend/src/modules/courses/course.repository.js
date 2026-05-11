import pool from "../../config/db.js";

export const getCourses = async (studyProgramId = null) => {
  const params = [];
  let query = `
    SELECT c.id, c.code, c.name, c.description, c.sks, c.study_program_id, sp.name as study_program_name
    FROM courses c
    JOIN study_programs sp ON c.study_program_id = sp.id
  `;

  if (studyProgramId) {
    query += " WHERE c.study_program_id = $1";
    params.push(studyProgramId);
  }

  query += " ORDER BY c.code";
  const result = await pool.query(query, params);

  return result.rows;
};

export const getCourseById = async (courseId) => {
  const result = await pool.query(
    `SELECT c.id, c.code, c.name, c.description, c.sks, c.study_program_id, sp.name as study_program_name
     FROM courses c
     JOIN study_programs sp ON c.study_program_id = sp.id
     WHERE c.id = $1`,
    [courseId],
  );

  return result.rows[0] || null;
};
