-- KRS Academic Information System - PostgreSQL Schema
-- UUID extension for primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- STUDY PROGRAMS TABLE
-- ============================================================================
CREATE TABLE study_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    max_sks INTEGER NOT NULL DEFAULT 24,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_study_programs_code ON study_programs(code);

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_role CHECK (role IN ('admin', 'student', 'lecturer'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================================
-- STUDENTS TABLE
-- ============================================================================
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    student_id VARCHAR(50) UNIQUE NOT NULL, -- NIM
    study_program_id UUID NOT NULL,
    semester INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (study_program_id) REFERENCES study_programs(id) ON DELETE RESTRICT,
    CONSTRAINT chk_semester CHECK (semester BETWEEN 1 AND 8)
);

CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_students_study_program_id ON students(study_program_id);
CREATE INDEX idx_students_student_id ON students(student_id);

-- ============================================================================
-- LECTURERS TABLE
-- ============================================================================
CREATE TABLE lecturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE,
    lecturer_id VARCHAR(50) UNIQUE NOT NULL, -- NIDN
    study_program_id UUID NOT NULL,
    specialization VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (study_program_id) REFERENCES study_programs(id) ON DELETE RESTRICT
);

CREATE INDEX idx_lecturers_user_id ON lecturers(user_id);
CREATE INDEX idx_lecturers_study_program_id ON lecturers(study_program_id);
CREATE INDEX idx_lecturers_lecturer_id ON lecturers(lecturer_id);

-- ============================================================================
-- ACADEMIC YEARS TABLE
-- ============================================================================
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year VARCHAR(20) NOT NULL, -- e.g., "2023/2024"
    semester INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT false,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    krs_start_date DATE NOT NULL,
    krs_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(year, semester),
    CONSTRAINT chk_semester CHECK (semester IN (1, 2)),
    CONSTRAINT chk_dates CHECK (start_date < end_date AND krs_start_date < krs_end_date)
);

CREATE INDEX idx_academic_years_is_active ON academic_years(is_active);
CREATE INDEX idx_academic_years_year_semester ON academic_years(year, semester);

-- ============================================================================
-- COURSES TABLE
-- ============================================================================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sks INTEGER NOT NULL,
    study_program_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (study_program_id) REFERENCES study_programs(id) ON DELETE RESTRICT,
    CONSTRAINT chk_sks CHECK (sks > 0 AND sks <= 6)
);

CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_courses_study_program_id ON courses(study_program_id);

-- ============================================================================
-- COURSE PREREQUISITES TABLE
-- ============================================================================
CREATE TABLE course_prerequisites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL,
    prerequisite_course_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (prerequisite_course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(course_id, prerequisite_course_id),
    CONSTRAINT chk_not_self_prerequisite CHECK (course_id != prerequisite_course_id)
);

CREATE INDEX idx_course_prerequisites_course_id ON course_prerequisites(course_id);
CREATE INDEX idx_course_prerequisites_prerequisite_course_id ON course_prerequisites(prerequisite_course_id);

-- ============================================================================
-- CLASSES TABLE
-- ============================================================================
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL,
    academic_year_id UUID NOT NULL,
    lecturer_id UUID NOT NULL,
    class_name VARCHAR(10) NOT NULL, -- A, B, C, etc.
    capacity INTEGER NOT NULL,
    current_enrollment INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE RESTRICT,
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(id) ON DELETE RESTRICT,
    UNIQUE(course_id, academic_year_id, class_name),
    CONSTRAINT chk_capacity CHECK (capacity > 0 AND current_enrollment >= 0 AND current_enrollment <= capacity)
);

CREATE INDEX idx_classes_course_id ON classes(course_id);
CREATE INDEX idx_classes_academic_year_id ON classes(academic_year_id);
CREATE INDEX idx_classes_lecturer_id ON classes(lecturer_id);

-- ============================================================================
-- CLASS SCHEDULES TABLE
-- ============================================================================
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL,
    day_of_week INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT chk_day_of_week CHECK (day_of_week BETWEEN 0 AND 6),
    CONSTRAINT chk_schedule_time CHECK (start_time < end_time)
);

CREATE INDEX idx_class_schedules_class_id ON class_schedules(class_id);
CREATE INDEX idx_class_schedules_day_time ON class_schedules(day_of_week, start_time, end_time);

-- ============================================================================
-- KRS (KARTU RENCANA STUDI) TABLE
-- ============================================================================
CREATE TABLE krs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    academic_year_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    rejection_reason TEXT,
    approved_by_id UUID, -- lecturer or admin who approved
    submitted_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE RESTRICT,
    FOREIGN KEY (approved_by_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE(student_id, academic_year_id),
    CONSTRAINT chk_krs_status CHECK (status IN ('draft', 'submitted', 'approved', 'rejected'))
);

CREATE INDEX idx_krs_student_id ON krs(student_id);
CREATE INDEX idx_krs_academic_year_id ON krs(academic_year_id);
CREATE INDEX idx_krs_status ON krs(status);
CREATE INDEX idx_krs_student_academic_year ON krs(student_id, academic_year_id);

-- ============================================================================
-- KRS DETAILS TABLE (many-to-many: KRS to Classes)
-- ============================================================================
CREATE TABLE krs_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    krs_id UUID NOT NULL,
    class_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (krs_id) REFERENCES krs(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
    UNIQUE(krs_id, class_id)
);

CREATE INDEX idx_krs_details_krs_id ON krs_details(krs_id);
CREATE INDEX idx_krs_details_class_id ON krs_details(class_id);

-- ============================================================================
-- VIEWS FOR FREQUENTLY USED QUERIES
-- ============================================================================

-- View for getting KRS with total SKS
CREATE VIEW krs_with_total_sks AS
SELECT 
    k.id,
    k.student_id,
    k.academic_year_id,
    k.status,
    COUNT(kd.id) as total_classes,
    COALESCE(SUM(c.sks), 0) as total_sks
FROM krs k
LEFT JOIN krs_details kd ON k.id = kd.krs_id
LEFT JOIN classes cl ON kd.class_id = cl.id
LEFT JOIN courses c ON cl.course_id = c.id
GROUP BY k.id, k.student_id, k.academic_year_id, k.status;

-- View for getting student profile with KRS info
CREATE VIEW student_profile_view AS
SELECT 
    u.id as user_id,
    u.email,
    u.name,
    s.id as student_id,
    s.student_id as nim,
    sp.id as study_program_id,
    sp.name as study_program_name,
    sp.max_sks,
    s.semester
FROM users u
JOIN students s ON u.id = s.user_id
JOIN study_programs sp ON s.study_program_id = sp.id
WHERE u.role = 'student';

-- View for getting available classes for current academic year
CREATE VIEW available_classes_view AS
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
    u.name as lecturer_name
FROM classes c
JOIN courses cr ON c.course_id = cr.id
JOIN academic_years ay ON c.academic_year_id = ay.id
JOIN lecturers l ON c.lecturer_id = l.id
JOIN users u ON l.user_id = u.id
WHERE ay.is_active = true;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE users IS 'System users with roles: admin, student, lecturer';
COMMENT ON TABLE students IS 'Student information linked to users';
COMMENT ON TABLE lecturers IS 'Lecturer information linked to users';
COMMENT ON TABLE study_programs IS 'Study programs (e.g., Computer Science, Engineering)';
COMMENT ON TABLE academic_years IS 'Academic year and semester configuration';
COMMENT ON TABLE courses IS 'Courses offered in study programs';
COMMENT ON TABLE course_prerequisites IS 'Prerequisites for courses';
COMMENT ON TABLE classes IS 'Class sections of courses for a specific academic year';
COMMENT ON TABLE class_schedules IS 'Schedule information for classes';
COMMENT ON TABLE krs IS 'Student course registration (Kartu Rencana Studi)';
COMMENT ON TABLE krs_details IS 'Classes selected in a KRS';

COMMENT ON COLUMN krs.status IS 'Status: draft (not submitted), submitted (waiting approval), approved (approved by lecturer/admin), rejected (rejected with reason)';
COMMENT ON COLUMN krs.approved_by_id IS 'User ID of the lecturer or admin who approved/rejected the KRS';
COMMENT ON COLUMN classes.current_enrollment IS 'Number of students currently enrolled in the class';
COMMENT ON COLUMN class_schedules.day_of_week IS '0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday';
