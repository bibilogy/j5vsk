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
  "/grade-groups",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rawData = await prisma.grade_groups.findMany({
        include: {
          grades: {
            include: {
              students: {
                include: {
                  enrollments: {
                    include: {
                      courses: {
                        include: {
                          subjects: true,
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

      // Construct response with unique courses
      const gradeGroupsWithGrades = rawData
        .map((group) => {
          const uniqueCourses = new Map();

          group.grades.forEach((grade) => {
            grade.students.forEach((student) => {
              student.enrollments.forEach((enrollment) => {
                const course = enrollment.courses;
                const courseTargetId = course?.course_target_id;
                const subject = course?.subjects;

                if (courseTargetId != null && subject) {
                  const key = `${courseTargetId}-${subject.subject_id}`;
                  if (!uniqueCourses.has(key)) {
                    uniqueCourses.set(key, {
                      course_target_id: courseTargetId,
                      subject_name: subject.name,
                    });
                  }
                }
              });
            });
          });

          return {
            grade_group_id: group.grade_group_id,
            name: group.name,
            courses: Array.from(uniqueCourses.values()),
          };
        })
        // ✅ Remove grade groups with empty courses
        .filter((group) => group.courses.length > 0);

      res.status(200).json({ gradeGroupsWithGrades });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/course-subjects",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courses = await prisma.courses.findMany({
        where: {
          course_target_id: {
            not: null,
          },
          course_targets: {
            target: {
              not: null,
            },
          },
        },
        select: {
          course_target_id: true,
          course_targets: {
            select: {
              description: true,
              target: true,
            },
          },
          subjects: {
            select: {
              name: true,
              field: true,
            },
          },
          enrollments: {
            take: 1,
            select: {
              students: {
                select: {
                  grades: {
                    select: {
                      name: true,
                      grade_groups: {
                        select: {
                          name: true,
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

      const rawCourseSubjects = courses.map((course) => ({
        courseTargetId: course.course_target_id!,
        subjectName: course.subjects.name,
        subjectField:
          fieldNameMap[course.subjects.field] || course.subjects.field,
        gradeGroupName:
          course.enrollments[0]?.students.grades.grade_groups.name ?? "N/A",
      }));

      const uniqueMap = new Map<string, (typeof rawCourseSubjects)[0]>();
      for (const cs of rawCourseSubjects) {
        const key = `${cs.courseTargetId}-${cs.subjectName}-${cs.gradeGroupName}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, cs);
        }
      }

      const uniqueCourseSubjects = Array.from(uniqueMap.values());

      // Sort by gradeGroupName
      uniqueCourseSubjects.sort((a, b) =>
        a.subjectName.localeCompare(b.subjectName, "lv", {
          sensitivity: "base",
        })
      );

      res.status(200).json(uniqueCourseSubjects);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/subject-target",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseTargetId = parseInt(req.query.course_target_id as string);

      if (isNaN(courseTargetId)) {
        res.status(400).json({ error: "Invalid or missing course_target_id" });
        return;
      }

      const course = await prisma.courses.findFirst({
        where: {
          course_target_id: courseTargetId,
        },
        select: {
          course_target_id: true,
          course_targets: {
            select: {
              description: true,
              target: true,
            },
          },
          subjects: {
            select: {
              name: true,
              icon: true,
              field: true,
            },
          },
          enrollments: {
            take: 1,
            select: {
              students: {
                select: {
                  grades: {
                    select: {
                      grade_groups: {
                        select: {
                          name: true,
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

      if (!course) {
        res.status(404).json({ error: "Course not found for given target ID" });
        return;
      }

      const response = {
        courseTargetId: course.course_target_id!,
        description: course.course_targets?.description ?? "",
        target: course.course_targets?.target ?? "",
        subjectName: course.subjects.name,
        subjectIcon: course.subjects.icon,
        subjectField:
          fieldNameMap[course.subjects.field] || course.subjects.field,
        gradeGroupName:
          course.enrollments[0]?.students.grades.grade_groups.name ?? "N/A",
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/update-course-target",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { courseTargetId, target } = req.body; // destructure object
      if (typeof courseTargetId !== "number" || typeof target !== "string") {
        res.status(400).json({ error: "Invalid request body" });
        return;
      }

      await prisma.course_targets.update({
        where: { course_target_id: courseTargetId },
        data: { target: target === "" ? null : target },
      });

      res.status(200).json({ message: "Course target updated successfully" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
