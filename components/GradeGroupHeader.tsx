import Image from "next/image";

export default function GradeGroupHeader({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-4 px-1">
      <div className="hidden md:block flex-shrink-0">
        <Image
          src="/compass.svg"
          alt="Compass"
          width={55}
          height={55}
          priority
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 px-5 py-3 flex-1">
        <div>
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#C4A882" }}
          >
            Klašu grupa
          </span>
          <h2 className="text-sm font-bold text-purple-950 leading-snug">
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
}
