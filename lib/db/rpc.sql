CREATE OR REPLACE FUNCTION get_courses_by_grade_id(p_grade_id INT)
RETURNS SETOF json
LANGUAGE sql
AS $$
  SELECT json_agg(row_to_json(t))
  FROM (
    SELECT
      c.course_id,
      s.name,
      s.icon,
      COUNT(e.enrollment_id) AS student_count
    FROM courses c
    JOIN subjects s ON c.subject_id = s.subject_id
    JOIN enrollments e ON c.course_id = e.course_id
    JOIN students st ON e.student_id = st.student_id AND st.grade_id = p_grade_id
    GROUP BY c.course_id, s.name, s.icon
    ORDER BY s.name
  ) t;
$$;

CREATE OR REPLACE FUNCTION get_grades_with_groups()
RETURNS SETOF json
LANGUAGE sql
AS $$
  SELECT json_agg(row_to_json(t))
  FROM (
    SELECT 
      g.grade_id,
      g.name,
      g.grade_group_id,
      g.student_count,
      gg.name as group_name,
      COALESCE(
        ARRAY_AGG(t.name ORDER BY t.name) FILTER (WHERE t.name IS NOT NULL),
        '{}'
      ) as class_teachers
    FROM grades g
    JOIN grade_groups gg ON g.grade_group_id = gg.grade_group_id
    LEFT JOIN class_teachers ct ON g.grade_id = ct.grade_id
    LEFT JOIN teachers t ON ct.teacher_id = t.teacher_id
    GROUP BY g.grade_id, g.name, g.grade_group_id, g.student_count, gg.name
    ORDER BY g.grade_id
  ) t;
$$;


CREATE OR REPLACE FUNCTION get_students_by_grade_and_course_ids(
  p_grade_id INT,
  p_course_id INT
)
RETURNS json
LANGUAGE sql
AS $$
  SELECT json_build_object(
    'course_id', c.course_id,
    'course_name', s.name,
    'course_field', s.field,
    'grade_name', g.name,
    'teachers', (
      SELECT COALESCE(json_agg(t.name ORDER BY t.name), '[]'::json)
      FROM teacher_assignments ta
      JOIN teachers t ON ta.teacher_id = t.teacher_id
      WHERE ta.course_id = p_course_id
    ),
    'students', (
      SELECT COALESCE(json_agg(
        json_build_object(
          'student_id', st.student_id,
          'name', st.name,
          'is_awaiting_test', e.is_test_pending
        ) ORDER BY st.name
      ), '[]'::json)
      FROM enrollments e
      JOIN students st ON e.student_id = st.student_id
      WHERE e.course_id = p_course_id
        AND st.grade_id = p_grade_id
    )
  )
  FROM courses c
  JOIN subjects s ON c.subject_id = s.subject_id
  JOIN grades g ON g.grade_id = p_grade_id
  WHERE c.course_id = p_course_id;
$$;


CREATE OR REPLACE FUNCTION get_pending_test_enrollments()
RETURNS SETOF json
LANGUAGE sql
AS $$
  SELECT json_agg(row_to_json(t))
  FROM (
    SELECT
    e.enrollment_id,
      st.name         AS student_name,
      g.name          AS grade_name,
      s.name          AS subject_name,
      s.field         AS subject_field
    FROM enrollments e
    JOIN students st ON e.student_id = st.student_id
    JOIN grades g    ON st.grade_id = g.grade_id
    JOIN courses c   ON e.course_id = c.course_id
    JOIN subjects s  ON c.subject_id = s.subject_id
    WHERE e.is_test_pending = TRUE
    ORDER BY g.name, st.name
  ) t;
$$;

CREATE OR REPLACE FUNCTION get_courses_by_grade_group_id(p_grade_group_id INT)
RETURNS SETOF json
LANGUAGE sql
AS $$
  SELECT json_agg(row_to_json(t) ORDER BY t.subject_name)
  FROM (
    SELECT DISTINCT ON (c.subject_id)
      c.course_id,
      s.name        AS subject_name,
      s.icon        AS subject_icon,
      s.field       AS subject_field,
      gg.name       AS grade_group_name
    FROM courses c
    JOIN subjects s       ON c.subject_id = s.subject_id
    JOIN enrollments e    ON c.course_id = e.course_id
    JOIN students st      ON e.student_id = st.student_id
    JOIN grades g         ON st.grade_id = g.grade_id
    JOIN grade_groups gg  ON g.grade_group_id = gg.grade_group_id
    WHERE gg.grade_group_id = p_grade_group_id
    ORDER BY c.subject_id, c.course_id
  ) t;
$$;