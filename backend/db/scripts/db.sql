-- --------------------------------------------------------
-- updated_at trigger function
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------
-- grade_groups
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS grade_groups (
    grade_group_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_grade_groups_name ON grade_groups(name);

CREATE OR REPLACE TRIGGER trg_grade_groups_updated_at
    BEFORE UPDATE ON grade_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- grades
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS grades (
    grade_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    grade_group_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grade_group_id) REFERENCES grade_groups(grade_group_id)
);

CREATE INDEX IF NOT EXISTS idx_grade_name ON grades(name);

CREATE OR REPLACE TRIGGER trg_grades_updated_at
    BEFORE UPDATE ON grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- students
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    grade_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grade_id) REFERENCES grades(grade_id)
);

CREATE INDEX IF NOT EXISTS idx_student_name ON students(name);

CREATE OR REPLACE TRIGGER trg_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- teachers
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_teacher_name ON teachers(name);

CREATE OR REPLACE TRIGGER trg_teachers_updated_at
    BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- subjects
-- --------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE subject_field AS ENUM (
        'Sociālā un pilsoniskā',
        'Kultūras izpratne un pašizpausme mākslā',
        'Valodas',
        'Dabaszinātnes',
        'Matemātika',
        'Tehnoloģijas',
        'Veselība un fiziskās aktivitātes'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    field subject_field NOT NULL,
    icon VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subject_name ON subjects(name);
CREATE INDEX IF NOT EXISTS idx_subject_field ON subjects(field);

CREATE OR REPLACE TRIGGER trg_subjects_updated_at
    BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- course_targets
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS course_targets (
    course_target_id SERIAL PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    target TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE TRIGGER trg_course_targets_updated_at
    BEFORE UPDATE ON course_targets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- courses
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL,
    course_target_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (course_target_id) REFERENCES course_targets(course_target_id)
);

CREATE OR REPLACE TRIGGER trg_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- teacher_assignments
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS teacher_assignments (
    teacher_assignment_id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    course_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (teacher_id, course_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE OR REPLACE TRIGGER trg_teacher_assignments_updated_at
    BEFORE UPDATE ON teacher_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- --------------------------------------------------------
-- enrollments
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    is_test_pending BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE OR REPLACE TRIGGER trg_enrollments_updated_at
    BEFORE UPDATE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();