"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GradeGroupCourse } from "@/types/types";
import {
  fetchCoursesByGradeGroupId,
  fetchGradeGroups,
} from "@/actions/data-fetching";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import GradeGroupHeader from "@/components/GradeGroupHeader";

const SR_COLOR = "#C4A882";

export default function SubjectsPage() {
  const { gradeGroupId } = useParams<{ gradeGroupId: string }>();
  const [courses, setCourses] = useState<GradeGroupCourse[]>();
  const [groupName, setGroupName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCoursesByGradeGroupId(Number(gradeGroupId)).then(setCourses),
      fetchGradeGroups().then((groups) => {
        const group = groups.find(
          (g: (typeof groups)[number]) =>
            g.grade_group_id === Number(gradeGroupId),
        );
        if (group) setGroupName(group.name);
      }),
    ]).finally(() => setIsLoading(false));
  }, [gradeGroupId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <HashLoader color={SR_COLOR} size={35} />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 h-full">
      <GradeGroupHeader name={groupName} />

      <div className="overflow-y-auto flex-1 custom-scroll px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 pb-4">
          {courses?.map((c) => (
            <Link
              key={c.course_id}
              href={`/grade-groups/${gradeGroupId}/courses/${c.course_id}`}
              style={{ height: "120px" }}
              className="relative flex flex-col justify-between rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 border-l-[3px] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-white/40 active:translate-y-0 active:shadow-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: "#8B6F47" }}
                  >
                    {c.subject_field}
                  </p>
                  <span className="text-xs font-semibold text-purple-950 leading-tight">
                    {c.subject_name}
                  </span>
                </div>
                <Image
                  src={`/icons/${c.subject_icon}.svg`}
                  alt={c.subject_name}
                  width={36}
                  height={36}
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(72%) sepia(25%) saturate(400%) hue-rotate(5deg) brightness(95%) contrast(85%)",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
