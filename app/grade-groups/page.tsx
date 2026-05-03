"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchGradeGroups } from "@/actions/data-fetching";
import Folder from "@/components/Folder/Folder";
import { HashLoader } from "react-spinners";

type GradeGroup = {
  grade_group_id: number;
  name: string;
};

export default function GradeGroupsPage() {
  const [gradeGroups, setGradeGroups] = useState<GradeGroup[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGradeGroups()
      .then(setGradeGroups)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <HashLoader color="#82B4C4" size={35} />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="overflow-y-auto flex-1 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
          {gradeGroups?.map((gg, i) => (
            <Link
              key={gg.grade_group_id}
              href={`/grade-groups/${gg.grade_group_id}`}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <Folder color="#82B4C4" />
              <span className="text-xs font-medium text-purple-950/70 group-hover:text-purple-950 transition-colors text-center">
                {gg.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
