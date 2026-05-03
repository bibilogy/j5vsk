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
          (g) => g.grade_group_id === Number(gradeGroupId),
        );
        if (group) setGroupName(group.name);
      }),
    ]).finally(() => setIsLoading(false));
  }, [gradeGroupId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <HashLoader color="#82B4C4" size={35} />
      </div>
    );

  return (
    <div className="flex flex-col gap-6 h-full">
      <GradeGroupHeader name={groupName} />

      <div className="overflow-y-auto flex-1 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-4">
          {courses?.map((c) => (
            <Link
              key={c.course_id}
              href={`/grade-groups/${gradeGroupId}/courses/${c.course_id}`}
              className="relative flex flex-col justify-between rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 p-4 aspect-[16/7] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-white/40 active:translate-y-0 active:shadow-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
                    {c.subject_name}
                  </p>
                  <span className="text-xs font-semibold text-purple-950 leading-tight max-w-[60%]">
                    {c.subject_field}
                  </span>
                </div>
                <Image
                  src={`/icons/${c.subject_icon}.svg`}
                  alt={c.subject_name}
                  width={36}
                  height={36}
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(8%) sepia(60%) saturate(4000%) hue-rotate(270deg) brightness(60%)",
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
