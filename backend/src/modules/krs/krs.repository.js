import pool from "../../config/db.js";

export const createKrs = async (studentId, academicYearId, client = null) => {
  const db = client || pool;

  const result = await db.query(
    `INSERT INTO krs (student_id, academic_year_id, status)
     VALUES ($1, $2, 'draft')
     RETURNING *`,
    [studentId, academicYearId],
  );

  return result.rows[0];
};

export const getKrsById = async (krsId) => {
  const result = await pool.query("SELECT * FROM krs WHERE id = $1", [krsId]);
  return result.rows[0] || null;
};

export const getKrsByStudentAndYear = async (studentId, academicYearId) => {
  const result = await pool.query(
    `SELECT * FROM krs WHERE student_id = $1 AND academic_year_id = $2`,
    [studentId, academicYearId],
  );
  return result.rows[0] || null;
};

export const getCurrentKrs = async (studentId) => {
  const result = await pool.query(
    `SELECT k.*, ay.year, ay.semester
     FROM krs k
     JOIN academic_years ay ON k.academic_year_id = ay.id
     WHERE k.student_id = $1 AND ay.is_active = true`,
    [studentId],
  );
  return result.rows[0] || null;
};

export const addClassToKrs = async (krsId, classId, client = null) => {
  const db = client || pool;

  const result = await db.query(
    `INSERT INTO krs_details (krs_id, class_id)
     VALUES ($1, $2)
     RETURNING *`,
    [krsId, classId],
  );

  // Update current enrollment
  await db.query(
    `UPDATE classes SET current_enrollment = current_enrollment + 1 WHERE id = $1`,
    [classId],
  );

  return result.rows[0];
};

export const removeClassFromKrs = async (
  krsDetailId,
  classId,
  client = null,
) => {
  const db = client || pool;

  await db.query("DELETE FROM krs_details WHERE id = $1", [krsDetailId]);

  // Update current enrollment
  await db.query(
    `UPDATE classes SET current_enrollment = current_enrollment - 1 WHERE id = $1`,
    [classId],
  );

  return true;
};

export const submitKrs = async (krsId, client = null) => {
  const db = client || pool;

  const result = await db.query(
    `UPDATE krs SET status = 'submitted', submitted_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [krsId],
  );

  return result.rows[0];
};

export const getKrsDetails = async (krsId) => {
  const result = await pool.query(
    `SELECT kd.id as krs_detail_id, kd.class_id,
            c.id, c.course_id, c.class_name, c.capacity, c.current_enrollment,
            cr.code, cr.name, cr.sks,
            u.name as lecturer_name,
            ARRAY_AGG(json_build_object(
              'day_of_week', cs.day_of_week,
              'start_time', cs.start_time,
              'end_time', cs.end_time,
              'room', cs.room
            )) as schedules
     FROM krs_details kd
     JOIN classes c ON kd.class_id = c.id
     JOIN courses cr ON c.course_id = cr.id
     JOIN lecturers l ON c.lecturer_id = l.id
     JOIN users u ON l.user_id = u.id
     LEFT JOIN class_schedules cs ON c.id = cs.class_id
     WHERE kd.krs_id = $1
     GROUP BY kd.id, kd.class_id, c.id, c.course_id, c.class_name, c.capacity, c.current_enrollment, cr.code, cr.name, cr.sks, u.name`,
    [krsId],
  );

  return result.rows;
};

export const getKrsWithTotalSks = async (krsId) => {
  const result = await pool.query(
    `SELECT 
      k.id, k.student_id, k.academic_year_id, k.status, k.submitted_at, k.approved_at, k.rejected_at,
      COUNT(kd.id) as total_classes,
      COALESCE(SUM(cr.sks), 0) as total_sks
     FROM krs k
     LEFT JOIN krs_details kd ON k.id = kd.krs_id
     LEFT JOIN classes c ON kd.class_id = c.id
     LEFT JOIN courses cr ON c.course_id = cr.id
     WHERE k.id = $1
     GROUP BY k.id`,
    [krsId],
  );

  return result.rows[0] || null;
};

export const getKrsHistory = async (studentId) => {
  const result = await pool.query(
    `SELECT k.*, ay.year, ay.semester
     FROM krs k
     JOIN academic_years ay ON k.academic_year_id = ay.id
     WHERE k.student_id = $1
     ORDER BY ay.year DESC, ay.semester DESC`,
    [studentId],
  );

  return result.rows;
};

export const approveKrs = async (
  krsId,
  approvedById,
  rejectionReason = null,
  client = null,
) => {
  const db = client || pool;

  const status = rejectionReason ? "rejected" : "approved";

  const result = await db.query(
    `UPDATE krs 
     SET status = $1, 
         approved_by_id = $2, 
         ${status === "rejected" ? "rejected_at" : "approved_at"} = NOW(),
         rejection_reason = $3
     WHERE id = $4
     RETURNING *`,
    [status, approvedById, rejectionReason, krsId],
  );

  return result.rows[0];
};

export const getPendingKrsForLecturer = async (lecturerId) => {
  const result = await pool.query(
    `SELECT DISTINCT k.*, s.student_id as nim, u.name as student_name, ay.year, ay.semester
     FROM krs k
     JOIN students s ON k.student_id = s.id
     JOIN users u ON s.user_id = u.id
     JOIN academic_years ay ON k.academic_year_id = ay.id
     JOIN krs_details kd ON k.id = kd.krs_id
     JOIN classes c ON kd.class_id = c.id
     WHERE c.lecturer_id = $1 AND k.status = 'submitted'
     ORDER BY k.submitted_at`,
    [lecturerId],
  );

  return result.rows;
};
