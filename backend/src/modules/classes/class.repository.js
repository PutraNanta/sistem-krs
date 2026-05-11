import pool from "../../config/db.js";

export const getAvailableClasses = async (studyProgramId = null) => {
  let query = `
    SELECT 
      c.id as class_id,
      c.class_name,
      cr.id as course_id,
      cr.code as course_code,
      cr.name as course_name,
      cr.sks,
      c.capacity,
      c.current_enrollment,
      (c.capacity - c.current_enrollment) as available_seats,
      ay.id as academic_year_id,
      ay.year as academic_year,
      ay.semester,
      l.id as lecturer_id,
      u.name as lecturer_name,
      ARRAY_AGG(json_build_object(
        'day_of_week', cs.day_of_week,
        'start_time', cs.start_time,
        'end_time', cs.end_time,
        'room', cs.room
      )) as schedules
    FROM classes c
    JOIN courses cr ON c.course_id = cr.id
    JOIN academic_years ay ON c.academic_year_id = ay.id
    JOIN lecturers l ON c.lecturer_id = l.id
    JOIN users u ON l.user_id = u.id
    LEFT JOIN class_schedules cs ON c.id = cs.class_id
    WHERE ay.is_active = true
  `;

  const params = [];

  if (studyProgramId) {
    query += ` AND cr.study_program_id = $1`;
    params.push(studyProgramId);
  }

  query += ` GROUP BY c.id, c.class_name, cr.id, cr.code, cr.name, cr.sks, c.capacity, c.current_enrollment, ay.id, ay.year, ay.semester, l.id, u.name
            ORDER BY cr.code, c.class_name`;

  const result = await pool.query(query, params);
  return result.rows;
};

export const getClassById = async (classId) => {
  const result = await pool.query(
    `SELECT c.*, cr.sks, cr.code, cr.name
     FROM classes c
     JOIN courses cr ON c.course_id = cr.id
     WHERE c.id = $1`,
    [classId],
  );
  return result.rows[0] || null;
};

export const getCourseById = async (courseId) => {
  const result = await pool.query("SELECT * FROM courses WHERE id = $1", [
    courseId,
  ]);
  return result.rows[0] || null;
};
