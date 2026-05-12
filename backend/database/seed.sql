-- KRS Academic Information System - Dummy Seed Data
-- WARNING: This is for development/testing only
-- Password hashes are for "password123" using bcrypt ($2a$12$ format)

-- ============================================================================
-- STUDY PROGRAMS DATA
-- ============================================================================
INSERT INTO study_programs (id, code, name, description, max_sks) VALUES
('11111111-1111-1111-1111-111111111111', 'CS', 'Computer Science', 'Computer Science Study Program', 24),
('22222222-2222-2222-2222-222222222222', 'ENG', 'Engineering', 'Software Engineering Study Program', 24);

-- ============================================================================
-- USERS DATA
-- ============================================================================
-- Admin User
INSERT INTO users (id, email, password, name, role, is_active) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Admin User', 'admin', true);

-- Lecturer Users
INSERT INTO users (id, email, password, name, role, is_active) VALUES
('bbbbbbbb-1111-1111-1111-111111111111', 'lecturer1@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Dr. John Smith', 'lecturer', true),
('bbbbbbbb-2222-2222-2222-222222222222', 'lecturer2@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Dr. Jane Doe', 'lecturer', true),
('bbbbbbbb-3333-3333-3333-333333333333', 'lecturer3@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Prof. Michael Brown', 'lecturer', true),
('bbbbbbbb-4444-4444-4444-444444444444', 'lecturer4@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Prof. Sarah Wilson', 'lecturer', true),
('bbbbbbbb-5555-5555-5555-555555555555', 'lecturer5@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Dr. Robert Taylor', 'lecturer', true);

-- Student Users
INSERT INTO users (id, email, password, name, role, is_active) VALUES
('cccccccc-1111-1111-1111-111111111111', 'student1@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Alice Johnson', 'student', true),
('cccccccc-2222-2222-2222-222222222222', 'student2@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Bob Miller', 'student', true),
('cccccccc-3333-3333-3333-333333333333', 'student3@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Carol Davis', 'student', true),
('cccccccc-4444-4444-4444-444444444444', 'student4@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'David Martinez', 'student', true),
('cccccccc-5555-5555-5555-555555555555', 'student5@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Emma Garcia', 'student', true),
('cccccccc-6666-6666-6666-666666666666', 'student6@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Frank Rodriguez', 'student', true),
('cccccccc-7777-7777-7777-777777777777', 'student7@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Grace Lee', 'student', true),
('cccccccc-8888-8888-8888-888888888888', 'student8@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Henry White', 'student', true),
('cccccccc-9999-9999-9999-999999999999', 'student9@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Iris Chen', 'student', true),
('cccccccc-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'student10@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Jack Anderson', 'student', true),
('cccccccc-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'student11@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Karen Thomas', 'student', true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'student12@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Leo Jackson', 'student', true),
('cccccccc-dddd-dddd-dddd-dddddddddddd', 'student13@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Mia White', 'student', true),
('cccccccc-eeee-eeee-eeee-eeeeeeeeeeee', 'student14@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Noah Harris', 'student', true),
('cccccccc-ffff-ffff-ffff-ffffffffffff', 'student15@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Olivia Martin', 'student', true),
('dddddddd-1111-1111-1111-111111111111', 'student16@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Paul Thompson', 'student', true),
('dddddddd-2222-2222-2222-222222222222', 'student17@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Quinn Garcia', 'student', true),
('dddddddd-3333-3333-3333-333333333333', 'student18@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Rachel Martinez', 'student', true),
('dddddddd-4444-4444-4444-444444444444', 'student19@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Sam Robinson', 'student', true),
('dddddddd-5555-5555-5555-555555555555', 'student20@example.com', '$2a$12$KbNjB2k75mgd/oTHi3Hv.uJ/qe.7m8tVz9bF1EyBEiQbgh/yTsvs2', 'Tina Clark', 'student', true);

-- ============================================================================
-- LECTURERS DATA
-- ============================================================================
INSERT INTO lecturers (id, user_id, lecturer_id, study_program_id, specialization) VALUES
('eeeeeeee-1111-1111-1111-111111111111', 'bbbbbbbb-1111-1111-1111-111111111111', 'LEC001', '11111111-1111-1111-1111-111111111111', 'Database Systems'),
('eeeeeeee-2222-2222-2222-222222222222', 'bbbbbbbb-2222-2222-2222-222222222222', 'LEC002', '11111111-1111-1111-1111-111111111111', 'Web Development'),
('eeeeeeee-3333-3333-3333-333333333333', 'bbbbbbbb-3333-3333-3333-333333333333', 'LEC003', '11111111-1111-1111-1111-111111111111', 'Algorithms'),
('eeeeeeee-4444-4444-4444-444444444444', 'bbbbbbbb-4444-4444-4444-444444444444', 'LEC004', '22222222-2222-2222-2222-222222222222', 'Software Architecture'),
('eeeeeeee-5555-5555-5555-555555555555', 'bbbbbbbb-5555-5555-5555-555555555555', 'LEC005', '22222222-2222-2222-2222-222222222222', 'Mobile Development');

-- ============================================================================
-- STUDENTS DATA
-- ============================================================================
INSERT INTO students (id, user_id, student_id, study_program_id, semester) VALUES
('ffffffff-1111-1111-1111-111111111111', 'cccccccc-1111-1111-1111-111111111111', 'STU001', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-2222-2222-2222-222222222222', 'cccccccc-2222-2222-2222-222222222222', 'STU002', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-3333-3333-3333-333333333333', 'cccccccc-3333-3333-3333-333333333333', 'STU003', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-4444-4444-4444-444444444444', 'cccccccc-4444-4444-4444-444444444444', 'STU004', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-5555-5555-5555-555555555555', 'cccccccc-5555-5555-5555-555555555555', 'STU005', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-6666-6666-6666-666666666666', 'cccccccc-6666-6666-6666-666666666666', 'STU006', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-7777-7777-7777-777777777777', 'cccccccc-7777-7777-7777-777777777777', 'STU007', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-8888-8888-8888-888888888888', 'cccccccc-8888-8888-8888-888888888888', 'STU008', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-9999-9999-9999-999999999999', 'cccccccc-9999-9999-9999-999999999999', 'STU009', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'STU010', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'STU011', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'STU012', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-dddd-dddd-dddd-dddddddddddd', 'cccccccc-dddd-dddd-dddd-dddddddddddd', 'STU013', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-eeee-eeee-eeee-eeeeeeeeeeee', 'STU014', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-ffff-ffff-ffff-ffffffffffff', 'STU015', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-1010-1010-1010-101010101010', 'dddddddd-1111-1111-1111-111111111111', 'STU016', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-2020-2020-2020-202020202020', 'dddddddd-2222-2222-2222-222222222222', 'STU017', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-3030-3030-3030-303030303030', 'dddddddd-3333-3333-3333-333333333333', 'STU018', '11111111-1111-1111-1111-111111111111', 3),
('ffffffff-4040-4040-4040-404040404040', 'dddddddd-4444-4444-4444-444444444444', 'STU019', '22222222-2222-2222-2222-222222222222', 4),
('ffffffff-5050-5050-5050-505050505050', 'dddddddd-5555-5555-5555-555555555555', 'STU020', '22222222-2222-2222-2222-222222222222', 4);

-- ============================================================================
-- ACADEMIC YEARS DATA
-- ============================================================================
INSERT INTO academic_years (id, year, semester, is_active, start_date, end_date, krs_start_date, krs_end_date) VALUES
('99999999-1111-1111-1111-111111111111', '2023/2024', 1, false, '2023-09-01', '2024-01-31', '2023-08-15', '2023-08-31'),
('99999999-2222-2222-2222-222222222222', '2023/2024', 2, true, '2024-02-01', '2024-06-30', '2024-01-15', '2024-01-31');

-- ============================================================================
-- COURSES DATA (15 courses)
-- ============================================================================
-- Computer Science courses
INSERT INTO courses (id, code, name, description, sks, study_program_id) VALUES
('dddddddd-1111-1111-1111-111111111111', 'CS101', 'Database Fundamentals', 'Introduction to database design and SQL', 3, '11111111-1111-1111-1111-111111111111'),
('dddddddd-2222-2222-2222-222222222222', 'CS102', 'Web Development Basics', 'HTML, CSS, JavaScript fundamentals', 4, '11111111-1111-1111-1111-111111111111'),
('dddddddd-3333-3333-3333-333333333333', 'CS103', 'Data Structures', 'Arrays, linked lists, trees, graphs', 3, '11111111-1111-1111-1111-111111111111'),
('dddddddd-4444-4444-4444-444444444444', 'CS104', 'Algorithms', 'Algorithm design and analysis', 3, '11111111-1111-1111-1111-111111111111'),
('dddddddd-5555-5555-5555-555555555555', 'CS105', 'Database Advanced', 'Advanced SQL, transactions, indexing', 3, '11111111-1111-1111-1111-111111111111'),
('dddddddd-6666-6666-6666-666666666666', 'CS106', 'Web Development Advanced', 'React, Vue, modern frameworks', 4, '11111111-1111-1111-1111-111111111111'),
('dddddddd-7777-7777-7777-777777777777', 'CS107', 'Operating Systems', 'Process management, memory management', 3, '11111111-1111-1111-1111-111111111111'),
('dddddddd-8888-8888-8888-888888888888', 'CS108', 'Networks', 'Network protocols, TCP/IP, DNS', 3, '11111111-1111-1111-1111-111111111111'),

-- Engineering courses
('dddddddd-9999-9999-9999-999999999999', 'ENG101', 'Software Architecture', 'Design patterns, MVC, microservices', 3, '22222222-2222-2222-2222-222222222222'),
('dddddddd-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ENG102', 'Software Testing', 'Unit testing, integration testing, QA', 3, '22222222-2222-2222-2222-222222222222'),
('dddddddd-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ENG103', 'Mobile Development', 'iOS and Android development basics', 4, '22222222-2222-2222-2222-222222222222'),
('dddddddd-cccc-cccc-cccc-cccccccccccc', 'ENG104', 'Cloud Computing', 'AWS, Azure, cloud infrastructure', 3, '22222222-2222-2222-2222-222222222222'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'ENG105', 'DevOps', 'Docker, Kubernetes, CI/CD pipelines', 3, '22222222-2222-2222-2222-222222222222'),
('dddddddd-eeee-eeee-eeee-eeeeeeeeeeee', 'ENG106', 'Machine Learning', 'ML basics, TensorFlow, scikit-learn', 4, '22222222-2222-2222-2222-222222222222'),
('dddddddd-ffff-ffff-ffff-ffffffffffff', 'ENG107', 'Security', 'Cryptography, authentication, authorization', 3, '22222222-2222-2222-2222-222222222222');

-- ============================================================================
-- COURSE PREREQUISITES DATA
-- ============================================================================
INSERT INTO course_prerequisites (id, course_id, prerequisite_course_id) VALUES
('eeeeeeee-1111-1111-1111-111111111111', 'dddddddd-5555-5555-5555-555555555555', 'dddddddd-1111-1111-1111-111111111111'), -- DB Advanced requires DB Fundamentals
('eeeeeeee-2222-2222-2222-222222222222', 'dddddddd-6666-6666-6666-666666666666', 'dddddddd-2222-2222-2222-222222222222'), -- Web Advanced requires Web Basic
('eeeeeeee-3333-3333-3333-333333333333', 'dddddddd-3333-3333-3333-333333333333', 'dddddddd-2222-2222-2222-222222222222'); -- Data Structures requires Web Basic

-- ============================================================================
-- CLASSES DATA (2 academic years, multiple classes per course)
-- ============================================================================
-- For Academic Year 2023/2024 Semester 1
INSERT INTO classes (id, course_id, academic_year_id, lecturer_id, class_name, capacity, current_enrollment) VALUES
('eeeeeeee-1111-1111-1111-111111111112', 'dddddddd-1111-1111-1111-111111111111', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-1111-1111-1111-111111111111', 'A', 30, 25),
('eeeeeeee-1111-1111-1111-111111111113', 'dddddddd-1111-1111-1111-111111111111', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-1111-1111-1111-111111111111', 'B', 30, 20),
('eeeeeeee-1111-1111-1111-111111111114', 'dddddddd-2222-2222-2222-222222222222', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-2222-2222-2222-222222222222', 'A', 25, 24),
('eeeeeeee-1111-1111-1111-111111111115', 'dddddddd-2222-2222-2222-222222222222', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-2222-2222-2222-222222222222', 'B', 25, 18),
('eeeeeeee-1111-1111-1111-111111111116', 'dddddddd-3333-3333-3333-333333333333', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-3333-3333-3333-333333333333', 'A', 30, 28),
('eeeeeeee-1111-1111-1111-111111111117', 'dddddddd-4444-4444-4444-444444444444', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-3333-3333-3333-333333333333', 'A', 30, 26),
('eeeeeeee-1111-1111-1111-111111111118', 'dddddddd-7777-7777-7777-777777777777', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-1111-1111-1111-111111111111', 'A', 30, 22),
('eeeeeeee-1111-1111-1111-111111111119', 'dddddddd-9999-9999-9999-999999999999', '99999999-1111-1111-1111-111111111111', 'eeeeeeee-4444-4444-4444-444444444444', 'A', 28, 25),

-- For Academic Year 2023/2024 Semester 2 (active)
('eeeeeeee-2222-2222-2222-222222222221', 'dddddddd-1111-1111-1111-111111111111', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-1111-1111-1111-111111111111', 'A', 30, 10),
('eeeeeeee-2222-2222-2222-222222222222', 'dddddddd-1111-1111-1111-111111111111', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-1111-1111-1111-111111111111', 'B', 30, 8),
('eeeeeeee-2222-2222-2222-222222222223', 'dddddddd-2222-2222-2222-222222222222', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222222', 'A', 25, 12),
('eeeeeeee-2222-2222-2222-222222222224', 'dddddddd-3333-3333-3333-333333333333', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-3333-3333-3333-333333333333', 'A', 30, 15),
('eeeeeeee-2222-2222-2222-222222222225', 'dddddddd-4444-4444-4444-444444444444', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-3333-3333-3333-333333333333', 'A', 30, 14),
('eeeeeeee-2222-2222-2222-222222222226', 'dddddddd-5555-5555-5555-555555555555', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-1111-1111-1111-111111111111', 'A', 28, 9),
('eeeeeeee-2222-2222-2222-222222222227', 'dddddddd-8888-8888-8888-888888888888', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222222', 'A', 30, 11),
('eeeeeeee-2222-2222-2222-222222222228', 'dddddddd-9999-9999-9999-999999999999', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-4444-4444-4444-444444444444', 'A', 28, 13),
('eeeeeeee-2222-2222-2222-222222222229', 'dddddddd-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-5555-5555-5555-555555555555', 'A', 25, 7),
('eeeeeeee-2222-2222-2222-222222222230', 'dddddddd-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '99999999-2222-2222-2222-222222222222', 'eeeeeeee-5555-5555-5555-555555555555', 'A', 25, 10);

-- ============================================================================
-- CLASS SCHEDULES DATA
-- ============================================================================
-- Semester 1 schedules
INSERT INTO class_schedules (id, class_id, day_of_week, start_time, end_time, room) VALUES
-- Database Fundamentals Class A
('ffffffff-1111-1111-1111-111111111111', 'eeeeeeee-1111-1111-1111-111111111112', 1, '08:00:00', '10:00:00', 'Room A101'),
('ffffffff-1111-1111-1111-111111111112', 'eeeeeeee-1111-1111-1111-111111111112', 3, '08:00:00', '10:00:00', 'Room A101'),
-- Database Fundamentals Class B
('ffffffff-1111-1111-1111-111111111113', 'eeeeeeee-1111-1111-1111-111111111113', 2, '10:30:00', '12:30:00', 'Room A102'),
('ffffffff-1111-1111-1111-111111111114', 'eeeeeeee-1111-1111-1111-111111111113', 4, '10:30:00', '12:30:00', 'Room A102'),
-- Web Development Basics Class A
('ffffffff-1111-1111-1111-111111111115', 'eeeeeeee-1111-1111-1111-111111111114', 1, '13:00:00', '15:00:00', 'Lab 201'),
('ffffffff-1111-1111-1111-111111111116', 'eeeeeeee-1111-1111-1111-111111111114', 4, '13:00:00', '15:00:00', 'Lab 201'),
-- Web Development Basics Class B
('ffffffff-1111-1111-1111-111111111117', 'eeeeeeee-1111-1111-1111-111111111115', 2, '15:30:00', '17:30:00', 'Lab 202'),
('ffffffff-1111-1111-1111-111111111118', 'eeeeeeee-1111-1111-1111-111111111115', 5, '15:30:00', '17:30:00', 'Lab 202'),
-- Data Structures Class A
('ffffffff-1111-1111-1111-111111111119', 'eeeeeeee-1111-1111-1111-111111111116', 1, '10:30:00', '12:30:00', 'Room B201'),
('ffffffff-1111-1111-1111-111111111120', 'eeeeeeee-1111-1111-1111-111111111116', 3, '10:30:00', '12:30:00', 'Room B201'),
-- Algorithms Class A
('ffffffff-1111-1111-1111-111111111121', 'eeeeeeee-1111-1111-1111-111111111117', 2, '08:00:00', '10:00:00', 'Room B102'),
('ffffffff-1111-1111-1111-111111111122', 'eeeeeeee-1111-1111-1111-111111111117', 4, '08:00:00', '10:00:00', 'Room B102'),

-- Semester 2 schedules (active)
-- Database Fundamentals Class A
('ffffffff-2222-2222-2222-222222222221', 'eeeeeeee-2222-2222-2222-222222222221', 1, '08:00:00', '10:00:00', 'Room A101'),
('ffffffff-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222221', 3, '08:00:00', '10:00:00', 'Room A101'),
-- Database Fundamentals Class B
('ffffffff-2222-2222-2222-222222222223', 'eeeeeeee-2222-2222-2222-222222222222', 2, '10:30:00', '12:30:00', 'Room A102'),
('ffffffff-2222-2222-2222-222222222224', 'eeeeeeee-2222-2222-2222-222222222222', 4, '10:30:00', '12:30:00', 'Room A102'),
-- Web Development Basics Class A
('ffffffff-2222-2222-2222-222222222225', 'eeeeeeee-2222-2222-2222-222222222223', 1, '13:00:00', '15:00:00', 'Lab 201'),
('ffffffff-2222-2222-2222-222222222226', 'eeeeeeee-2222-2222-2222-222222222223', 4, '13:00:00', '15:00:00', 'Lab 201'),
-- Data Structures Class A
('ffffffff-2222-2222-2222-222222222227', 'eeeeeeee-2222-2222-2222-222222222224', 1, '10:30:00', '12:30:00', 'Room B201'),
('ffffffff-2222-2222-2222-222222222228', 'eeeeeeee-2222-2222-2222-222222222224', 3, '10:30:00', '12:30:00', 'Room B201'),
-- Algorithms Class A
('ffffffff-2222-2222-2222-222222222229', 'eeeeeeee-2222-2222-2222-222222222225', 2, '08:00:00', '10:00:00', 'Room B102'),
('ffffffff-2222-2222-2222-222222222230', 'eeeeeeee-2222-2222-2222-222222222225', 4, '08:00:00', '10:00:00', 'Room B102'),
-- Advanced DB Class A
('ffffffff-2222-2222-2222-222222222231', 'eeeeeeee-2222-2222-2222-222222222226', 3, '13:00:00', '15:00:00', 'Room A103'),
('ffffffff-2222-2222-2222-222222222232', 'eeeeeeee-2222-2222-2222-222222222226', 5, '13:00:00', '15:00:00', 'Room A103'),
-- Networks Class A
('ffffffff-2222-2222-2222-222222222233', 'eeeeeeee-2222-2222-2222-222222222227', 2, '15:30:00', '17:30:00', 'Room B301'),
('ffffffff-2222-2222-2222-222222222234', 'eeeeeeee-2222-2222-2222-222222222227', 5, '15:30:00', '17:30:00', 'Room B301'),
-- Software Architecture Class A
('ffffffff-2222-2222-2222-222222222235', 'eeeeeeee-2222-2222-2222-222222222228', 1, '15:30:00', '17:30:00', 'Room C101'),
('ffffffff-2222-2222-2222-222222222236', 'eeeeeeee-2222-2222-2222-222222222228', 4, '15:30:00', '17:30:00', 'Room C101'),
-- Software Testing Class A
('ffffffff-2222-2222-2222-222222222237', 'eeeeeeee-2222-2222-2222-222222222229', 3, '08:00:00', '10:00:00', 'Lab 301'),
('ffffffff-2222-2222-2222-222222222238', 'eeeeeeee-2222-2222-2222-222222222229', 5, '08:00:00', '10:00:00', 'Lab 301'),
-- Mobile Development Class A
('ffffffff-2222-2222-2222-222222222239', 'eeeeeeee-2222-2222-2222-222222222230', 2, '13:00:00', '15:00:00', 'Lab 302'),
('ffffffff-2222-2222-2222-222222222240', 'eeeeeeee-2222-2222-2222-222222222230', 5, '13:00:00', '15:00:00', 'Lab 302');

-- ============================================================================
-- KRS DATA (Sample KRS records)
-- ============================================================================
-- Student 1 - Draft KRS for active academic year
INSERT INTO krs (id, student_id, academic_year_id, status, created_at) VALUES
('aaaaaaaa-1111-1111-1111-111111111111', 'ffffffff-1111-1111-1111-111111111111', '99999999-2222-2222-2222-222222222222', 'draft', NOW());

-- Student 2 - Submitted KRS
INSERT INTO krs (id, student_id, academic_year_id, status, submitted_at, created_at) VALUES
('aaaaaaaa-2222-2222-2222-222222222222', 'ffffffff-2222-2222-2222-222222222222', '99999999-2222-2222-2222-222222222222', 'submitted', NOW(), NOW());

-- Student 3 - Approved KRS
INSERT INTO krs (id, student_id, academic_year_id, status, submitted_at, approved_at, approved_by_id, created_at) VALUES
('aaaaaaaa-3333-3333-3333-333333333333', 'ffffffff-3333-3333-3333-333333333333', '99999999-2222-2222-2222-222222222222', 'approved', NOW(), NOW(), 'bbbbbbbb-1111-1111-1111-111111111111', NOW());

-- Student 4 - Rejected KRS
INSERT INTO krs (id, student_id, academic_year_id, status, rejection_reason, submitted_at, rejected_at, created_at) VALUES
('aaaaaaaa-4444-4444-4444-444444444444', 'ffffffff-4444-4444-4444-444444444444', '99999999-2222-2222-2222-222222222222', 'rejected', 'Schedule conflict detected', NOW(), NOW(), NOW());

-- Student 5 - Submitted KRS (awaiting approval)
INSERT INTO krs (id, student_id, academic_year_id, status, submitted_at, created_at) VALUES
('aaaaaaaa-5555-5555-5555-555555555555', 'ffffffff-5555-5555-5555-555555555555', '99999999-2222-2222-2222-222222222222', 'submitted', NOW(), NOW());

-- ============================================================================
-- KRS DETAILS DATA (Classes in KRS)
-- ============================================================================
-- Student 1 Draft KRS (2 classes selected)
INSERT INTO krs_details (id, krs_id, class_id, created_at) VALUES
('bbbbbbbb-1111-1111-1111-111111111111', 'aaaaaaaa-1111-1111-1111-111111111111', 'eeeeeeee-2222-2222-2222-222222222221', NOW()),
('bbbbbbbb-2222-2222-2222-222222222222', 'aaaaaaaa-1111-1111-1111-111111111111', 'eeeeeeee-2222-2222-2222-222222222223', NOW());

-- Student 2 Submitted KRS (3 classes selected)
INSERT INTO krs_details (id, krs_id, class_id, created_at) VALUES
('bbbbbbbb-3333-3333-3333-333333333333', 'aaaaaaaa-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222221', NOW()),
('bbbbbbbb-4444-4444-4444-444444444444', 'aaaaaaaa-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222223', NOW()),
('bbbbbbbb-5555-5555-5555-555555555555', 'aaaaaaaa-2222-2222-2222-222222222222', 'eeeeeeee-2222-2222-2222-222222222224', NOW());

-- Student 3 Approved KRS (4 classes selected)
INSERT INTO krs_details (id, krs_id, class_id, created_at) VALUES
('bbbbbbbb-6666-6666-6666-666666666666', 'aaaaaaaa-3333-3333-3333-333333333333', 'eeeeeeee-2222-2222-2222-222222222221', NOW()),
('bbbbbbbb-7777-7777-7777-777777777777', 'aaaaaaaa-3333-3333-3333-333333333333', 'eeeeeeee-2222-2222-2222-222222222223', NOW()),
('bbbbbbbb-8888-8888-8888-888888888888', 'aaaaaaaa-3333-3333-3333-333333333333', 'eeeeeeee-2222-2222-2222-222222222224', NOW()),
('bbbbbbbb-9999-9999-9999-999999999999', 'aaaaaaaa-3333-3333-3333-333333333333', 'eeeeeeee-2222-2222-2222-222222222225', NOW());

-- Student 4 Rejected KRS (2 classes conflicting)
INSERT INTO krs_details (id, krs_id, class_id, created_at) VALUES
('bbbbbbbb-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-4444-4444-4444-444444444444', 'eeeeeeee-2222-2222-2222-222222222221', NOW()),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-4444-4444-4444-444444444444', 'eeeeeeee-2222-2222-2222-222222222223', NOW());

-- Student 5 Submitted KRS (5 classes selected)
INSERT INTO krs_details (id, krs_id, class_id, created_at) VALUES
('bbbbbbbb-cccc-cccc-cccc-cccccccccccc', 'aaaaaaaa-5555-5555-5555-555555555555', 'eeeeeeee-2222-2222-2222-222222222221', NOW()),
('bbbbbbbb-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-5555-5555-5555-555555555555', 'eeeeeeee-2222-2222-2222-222222222223', NOW()),
('bbbbbbbb-eeee-eeee-eeee-eeeeeeeeeeee', 'aaaaaaaa-5555-5555-5555-555555555555', 'eeeeeeee-2222-2222-2222-222222222224', NOW()),
('bbbbbbbb-ffff-ffff-ffff-ffffffffffff', 'aaaaaaaa-5555-5555-5555-555555555555', 'eeeeeeee-2222-2222-2222-222222222225', NOW()),
('cccccccc-1111-1111-1111-111111111111', 'aaaaaaaa-5555-5555-5555-555555555555', 'eeeeeeee-2222-2222-2222-222222222226', NOW());
