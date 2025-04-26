import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Mapping from enum raw values to human-readable field names
const fieldNameMap: Record<string, string> = {
  Soci_l__un_pilsonisk_: "Sociālā un pilsoniskā",
  Kult_ras_izpratne_un_pa_izpausme_m_ksl_:
    "Kultūras izpratne un pašizpausme mākslā",
  Valodas: "Valodas",
  Dabaszin_tnes: "Dabaszinātnes",
  Matem_tika: "Matemātika",
  Tehnolo_ijas: "Tehnoloģijas",
  Vesel_ba_un_fizisk_s_aktivit_tes: "Veselība un fiziskās aktivitātes",
};

router.get(
  "/grades",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gradeGroupsWithGrades = await prisma.grade_groups.findMany({
        include: {
          grades: true,
        },
      });

      res.status(200).json({ gradeGroupsWithGrades });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/subjects",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gradeId = parseInt(req.query.grade_id as string);

      if (isNaN(gradeId)) {
        res.status(400).json({ error: "Invalid or missing grade_id" });
        return;
      }

      const grade = await prisma.grades.findUnique({
        where: { grade_id: gradeId },
        include: {
          students: {
            include: {
              enrollments: {
                include: {
                  courses: {
                    include: {
                      subjects: true, // Include the subjects related to courses
                      teacher_assignments: {
                        include: {
                          teachers: true, // Include the teachers related to courses
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!grade) {
        res.status(404).json({ error: "Grade not found" });
        return;
      }

      const result: {
        courseId: number; // Include course_id
        gradeId: number;
        gradeName: string;
        subjectName: string;
        subjectField: string;
        icon: string | null;
        teacherNames: string[]; // Array of teacher names
        enrollmentCount: number; // Add the enrollment count
      }[] = [];

      // Iterate over students and their enrollments to build the result
      for (const student of grade.students) {
        for (const enrollment of student.enrollments) {
          const course = enrollment.courses;
          const subject = course.subjects; // Get the subject related to the course

          // Map the subject field to human-readable names
          const readableField = fieldNameMap[subject.field] || subject.field;

          // Get the count of enrollments for the current course
          const enrollmentCount = await prisma.enrollments.count({
            where: {
              course_id: course.course_id,
              students: {
                grade_id: gradeId,
              },
            },
          });

          // Collect the teacher names into an array
          const teacherNames = course.teacher_assignments.map(
            (assignment) => assignment.teachers.name
          );

          result.push({
            courseId: course.course_id, // Add course_id from courses model
            gradeId: grade.grade_id,
            gradeName: grade.name,
            subjectName: subject.name,
            subjectField: readableField, // Use the mapped field
            icon: subject.icon,
            teacherNames:
              teacherNames.length > 0 ? teacherNames : ["Unassigned"], // Teachers as an array
            enrollmentCount, // Add enrollment count for the course
          });
        }
      }

      // Deduplicate by courseId + subjectName + teacherNames
      const uniqueSubjects = Array.from(
        new Map(
          result.map((item) => [
            `${item.courseId}_${item.subjectName}_${item.teacherNames.join(
              ","
            )}`,
            item,
          ])
        ).values()
      );

      // Sort by courseId
      const sortedSubjects = uniqueSubjects.sort(
        (a, b) => a.courseId - b.courseId
      );

      // Send the sorted result with enrollment counts
      res.json(sortedSubjects);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/students-by-course",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const gradeId = parseInt(req.query.grade_id as string);
      const courseId = parseInt(req.query.course_id as string);

      if (isNaN(gradeId) || isNaN(courseId)) {
        res
          .status(400)
          .json({ error: "Invalid or missing grade_id or course_id" });
        return;
      }

      const course = await prisma.courses.findUnique({
        where: {
          course_id: courseId,
        },
        include: {
          enrollments: {
            include: {
              students: {
                include: {
                  grades: true,
                },
              },
            },
          },
          subjects: true,
          teacher_assignments: {
            include: {
              teachers: true,
            },
          },
        },
      });

      if (!course) {
        res.status(404).json({ error: "Course not found" });
        return;
      }

      const enrollments = await prisma.enrollments.findMany({
        where: {
          course_id: courseId,
          students: {
            grade_id: gradeId,
          },
        },
        include: {
          students: true,
        },
      });

      const studentsList = enrollments.map((enrollment) => ({
        enrollmentId: enrollment.enrollment_id,
        studentId: enrollment.students.student_id,
        studentName: enrollment.students.name,
        isTestPending: enrollment.is_test_pending,
      }));

      const teacherNames = course.teacher_assignments.map(
        (assignment) => assignment.teachers.name
      );

      const subjectFieldRaw = course.subjects.field;
      const readableSubjectField =
        fieldNameMap[subjectFieldRaw] || subjectFieldRaw;

      // Extract grade name from the first student that has it
      const firstStudentWithGrade = course.enrollments.find(
        (e) => e.students?.grades?.name
      );
      const gradeName =
        firstStudentWithGrade?.students?.grades?.name || "Unknown";

      const response = {
        courseId: course.course_id,
        subjectName: course.subjects.name,
        subjectField: readableSubjectField,
        subjectIcon: course.subjects.icon,
        gradeName: gradeName,
        teacherNames: teacherNames.length ? teacherNames : ["Unassigned"],
        students: studentsList,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/pending-tests",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pendingEnrollments = await prisma.enrollments.findMany({
        where: {
          is_test_pending: true,
        },
        include: {
          students: {
            include: {
              grades: true,
            },
          },
          courses: {
            include: {
              subjects: true,
            },
          },
        },
        orderBy: {
          students: {
            name: "asc", // <-- sort by student's name ascending (A-Z)
          },
        },
      });

      const response = pendingEnrollments.map((enrollment) => ({
        enrollmentId: enrollment.enrollment_id,
        studentName: enrollment.students.name,
        gradeName: enrollment.students.grades.name,
        subjectName: enrollment.courses.subjects.name,
      }));

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/update-test-pending",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { enrollmentId, isTestPending } = req.body; // destructure object
      if (
        typeof enrollmentId !== "number" ||
        typeof isTestPending !== "boolean"
      ) {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      await prisma.enrollments.update({
        where: { enrollment_id: enrollmentId },
        data: { is_test_pending: isTestPending },
      });

      res.status(200).json({ message: "Enrollment updated successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
