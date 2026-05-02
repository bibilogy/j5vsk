"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchGradeGroupsAndGrades } from "@/actions/data-fetching";
import { useAppStore } from "@/store/useAppStore";
import Folder from "./Folder/Folder";
import { Grade } from "@/types/types";

export default function KpdWindow() {
  const { setActiveGrade } = useAppStore();
  const [grades, setGrades] = useState<Grade[]>();
  const [activeGroupIds, setActiveGroupIds] = useState<number[]>([]);

  useEffect(() => {
    fetchGradeGroupsAndGrades().then(setGrades);
  }, []);

  const gradeGroups = grades
    ? [
        ...new Map(
          grades.map((g) => [
            g.grade_group_id,
            { id: g.grade_group_id, name: g.group_name },
          ]),
        ).values(),
      ]
    : [];

  const toggleGroup = (id: number) => {
    setActiveGroupIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const filteredGrades =
    activeGroupIds.length === 0
      ? grades
      : grades?.filter((g) => activeGroupIds.includes(g.grade_group_id));

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Badges — never scrolls */}
      <div className="flex flex-wrap gap-2 flex-shrink-0 justify-center">
        {gradeGroups.map((gg) => (
          <button
            key={gg.id}
            onClick={() => toggleGroup(gg.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all duration-200
            ${
              activeGroupIds.includes(gg.id)
                ? "bg-white/65 border-white/60 text-purple-950"
                : "bg-white/30 border-white/50 text-purple-900/70 hover:bg-white/45"
            }`}
          >
            {gg.name}
          </button>
        ))}
      </div>

      {/* Folders — scrolls independently */}
      <div className="overflow-y-auto flex-1 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
          {filteredGrades?.map((g) => (
            <Link
              key={g.grade_id}
              href="subjects"
              onClick={() => setActiveGrade(g)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <Folder color="#82B4C4" />
              <span className="text-xs text-purple-950/70 font-medium group-hover:text-purple-950 transition-colors">
                {g.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
