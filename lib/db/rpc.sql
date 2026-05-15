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

CREATE OR REPLACE FUNCTION get_grade_groups_with_targets()
RETURNS SETOF json
LANGUAGE sql
AS $$
  SELECT json_agg(row_to_json(t) ORDER BY t.grade_group_id)
  FROM (
    SELECT DISTINCT
      gg.grade_group_id,
      gg.name
    FROM grade_groups gg
    JOIN grades g        ON g.grade_group_id = gg.grade_group_id
    JOIN students st     ON st.grade_id = g.grade_id
    JOIN enrollments e   ON e.student_id = st.student_id
    JOIN courses c       ON c.course_id = e.course_id
    WHERE c.course_target_id IS NOT NULL
  ) t;
$$;

CREATE OR REPLACE FUNCTION get_course_target(p_course_id INT)
RETURNS TABLE (
    course_target_id INT,
    description VARCHAR,
    target TEXT,
    icon VARCHAR
)
LANGUAGE sql
STABLE
AS $$
    SELECT 
        ct.course_target_id,
        ct.description,
        ct.target,
        s.icon
    FROM courses c
    JOIN course_targets ct ON ct.course_target_id = c.course_target_id
    JOIN subjects s ON s.subject_id = c.subject_id
    WHERE c.course_id = p_course_id;
$$;

CREATE OR REPLACE FUNCTION update_course_target(p_course_target_id INT, p_target TEXT)
RETURNS VOID
LANGUAGE sql
AS $$
    UPDATE course_targets
    SET target = p_target
    WHERE course_target_id = p_course_target_id;
$$;

CREATE OR REPLACE FUNCTION get_course_targets()
RETURNS TABLE (
    course_target_id INT,
    description VARCHAR(100),
    target TEXT,
    subject_field subject_field,
    grade_group_id INT,
    course_id INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (ct.description, s.field)
        ct.course_target_id,
        ct.description,
        ct.target,
        s.field AS subject_field,
        g.grade_group_id,
        c.course_id
    FROM course_targets ct
    JOIN courses c ON c.course_target_id = ct.course_target_id
    JOIN subjects s ON s.subject_id = c.subject_id
    JOIN enrollments e ON e.course_id = c.course_id
    JOIN students st ON st.student_id = e.student_id
    JOIN grades g ON g.grade_id = st.grade_id
    WHERE ct.target IS NOT NULL
      AND TRIM(ct.target) <> ''
    ORDER BY ct.description, s.field, ct.course_target_id;
END;
$$ LANGUAGE plpgsql;


   CREATE OR REPLACE FUNCTION get_course_targets_by_grade_group()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
RETURN (
    SELECT JSON_AGG(result)
    FROM (
             SELECT DISTINCT
                 gg.name AS grade_group_name,
                 s.name  AS subject_name,
                 ct.target
             FROM course_targets ct
                      JOIN courses      c  ON c.course_target_id = ct.course_target_id
                      JOIN subjects     s  ON s.subject_id       = c.subject_id
                      JOIN enrollments  e  ON e.course_id        = c.course_id
                      JOIN students     st ON st.student_id      = e.student_id
                      JOIN grades       g  ON g.grade_id         = st.grade_id
                      JOIN grade_groups gg ON gg.grade_group_id  = g.grade_group_id
             WHERE ct.target IS NOT NULL
         ) result
);
END;
$$;
GRANT EXECUTE ON FUNCTION get_course_targets_by_grade_group() TO anon, authenticated;