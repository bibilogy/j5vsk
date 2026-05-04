// components/GradeHeader.tsx
import Image from "next/image";
import { Users, BookOpen } from "lucide-react";
import { Grade } from "@/types/types";

export default function GradeHeader({ grade }: { grade: Grade }) {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block flex-shrink-0">
        <Image
          src="/owl.svg"
          alt="Owl"
          width={65}
          height={65}
          priority
          style={{
            filter:
              "brightness(0) saturate(100%) invert(8%) sepia(60%) saturate(4000%) hue-rotate(270deg) brightness(60%)",
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 px-5 py-3 flex-1">
        <div>
          <span className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
            Klase
          </span>
          <h2 className="text-lg font-bold text-purple-950">{grade.name}</h2>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/40" />
        {/* <div className="block md:hidden w-full h-px bg-white/40" /> */}

        <div className="items-center gap-2 hidden md:flex">
          <div className="w-6 h-6 rounded-lg bg-white/40 flex items-center justify-center flex-shrink-0">
            <BookOpen size={12} className="text-purple-900" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
              {grade?.class_teachers?.length === 1
                ? "Klases audzinātājs"
                : "Klases audzinātāji"}
            </span>
            <p className="text-sm font-medium text-purple-950">
              {grade?.class_teachers?.length
                ? grade.class_teachers.join(", ")
                : "—"}
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/40" />
        {/* <div className="block md:hidden w-full h-px bg-white/40" /> */}

        <div className="hidden md:flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/40 flex items-center justify-center flex-shrink-0">
            <Users size={12} className="text-purple-900" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
              Skolēnu skaits
            </span>
            <p className="text-sm font-medium text-purple-950">
              {grade.student_count ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
