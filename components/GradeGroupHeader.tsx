import Image from "next/image";

export default function GradeGroupHeader({ name }: { name: string }) {
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
            Klašu grupa
          </span>
          <h2 className="text-lg font-bold text-purple-950">{name}</h2>
        </div>
      </div>
    </div>
  );
}
