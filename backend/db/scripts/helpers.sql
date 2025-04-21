select a.course_id, b.name, d.name from courses a, subjects b, teacher_assignments c, teachers d where a.subject_id = b.subject_id and a.course_id = c.course_id and c.teacher_id = d.teacher_id order by a.course_id;

select distinct a.course_id, b.name, g.name, count(e.enrollment_id) as student_count from courses a, subjects b, enrollments e, students f, grades g, grade_groups h where a.subject_id = b.subject_id and e.course_id = a.course_id and f.student_id = e.student_id and g.grade_id = f.grade_id and g.grade_group_id = h.grade_group_id group by g.name, a.course_id, b.name;

select c.name, d.name from courses a, enrollments b, students c, grades d where a.course_id = b.course_id and b.student_id = c.student_id and d.grade_id = c.grade_id and a.course_id=5;

select count(*) from courses a, enrollments b, students c, grades d where a.course_id = b.course_id and b.student_id = c.student_id and d.grade_id = c.grade_id;

select a.course_id, d.name, c.name from courses a, teacher_assignments b, teachers c, subjects d where a.course_id = b.course_id and b.teacher_id = c.teacher_id and d.subject_id = a.subject_id order by a.course_id;

select * from teacher_assignments where course_id=;
update teacher_assignments set teacher_id= where teacher_assignment_id=;

select a.name, b.name, e.name, g.name from students a, grades b, enrollments c, courses d, subjects e, teacher_assignments f, teachers g where a.grade_id = b.grade_id and c.student_id = a.student_id and d.course_id = c.course_id and e.subject_id = d.subject_id and d.course_id = f.course_id and g.teacher_id = f.teacher_id and d.course_id=11 order by a.name;

select distinct a.name, e.name, g.name from grades a, students b, enrollments c, courses d, subjects e, teacher_assignments f, teachers g where a.grade_id = b.grade_id and b.student_id = c.student_id and c.course_id = d.course_id and d.subject_id = e.subject_id and d.course_id = f.course_id and f.teacher_id = g.teacher_id and a.grade_id=1;
