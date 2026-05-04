"use client";

import { fetchCourseTarget, updateCourseTarget } from "@/actions/data-fetching";
import { extractTextFromFile } from "@/actions/extract-file-text";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef, CSSProperties } from "react";
import { Textarea } from "@/components/ui/textarea";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import { Info, Paperclip, Upload, X } from "lucide-react";

const SR_COLOR = "#C4A882";

type CourseTarget = {
  course_target_id: number;
  description: string;
  target: string | null;
  icon: string;
};

const ALLOWED_EXTENSIONS = ".pdf,.docx,.xlsx,.txt";
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/octet-stream",
  "application/zip",
  "application/x-zip-compressed",
];
const ALLOWED_EXTS = ["pdf", "docx", "xlsx", "txt"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function isAllowedFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_MIME_TYPES.includes(file.type) || ALLOWED_EXTS.includes(ext);
}

export default function CourseTargetsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseTarget, setCourseTarget] = useState<CourseTarget | null>(null);
  const [target, setTarget] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExtracting, setIsExtracting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCourseTarget(Number(courseId))
      .then((data) => {
        setCourseTarget(data);
        setTarget(data?.target ?? "");
      })
      .finally(() => setIsLoading(false));
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTarget(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (courseTarget?.course_target_id) {
        updateCourseTarget(courseTarget.course_target_id, value);
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError(null);
    e.target.value = "";

    if (!isAllowedFile(file)) {
      setFileError("Unsupported format. Please use PDF, DOCX, XLSX, or TXT.");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setFileError(
        `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`,
      );
      return;
    }

    setIsExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await extractTextFromFile(formData);

      if (result.success && result.text) {
        const newValue = result.text;
        setTarget(newValue);

        if (courseTarget?.course_target_id) {
          if (debounceRef.current) clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            updateCourseTarget(courseTarget.course_target_id, newValue);
          }, 1500);
        }
      } else {
        setFileError(result.error ?? "Failed to extract text.");
      }
    } catch {
      setFileError("Unexpected error. Please try again.");
    } finally {
      setIsExtracting(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <HashLoader color={SR_COLOR} size={35} />
      </div>
    );

  if (!courseTarget) return <p>No target found for courseId: {courseId}</p>;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block flex-shrink-0">
          <Image
            src={`/icons/${courseTarget.icon}.svg`}
            alt={courseTarget.description}
            width={55}
            height={55}
            priority
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 px-5 py-3 flex-1">
          <div>
            <span
              className="text-[10px] xl:text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#C4A882" }}
            >
              Sasniedzamie rezultāti
            </span>
            <h2 className="text-sm font-bold text-purple-950 leading-snug">
              {courseTarget.description}
            </h2>
          </div>
        </div>
      </div>

      {/* Textarea area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          gap: "8px",
        }}
      >
        {/* Top info bar — now OUTSIDE the textarea */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Auto-save label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "8px",
              padding: "6px 10px",
            }}
          >
            <Info
              style={{ width: 14, height: 14, color: "#1e1b4b", flexShrink: 0 }}
            />
            <span style={{ color: "rgba(30,27,75,0.7)", fontSize: "10px" }}>
              Izmaiņas tiek saglabātas automātiski.
            </span>
          </div>

          {/* File upload button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_EXTENSIONS}
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isExtracting}
              className="file-upload-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                padding: "2px 0",
                cursor: isExtracting ? "not-allowed" : "pointer",
                fontSize: "11px",
                fontWeight: 600,
                opacity: isExtracting ? 0.4 : 1,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: "rgba(180, 160, 196, 0.5)",
                transition:
                  "color 0.2s, text-decoration-color 0.2s, opacity 0.15s",
              }}
            >
              <Upload style={{ width: 13, height: 13, flexShrink: 0 }} />
              <span>Pievienot failu</span>
            </button>
          </div>
        </div>

        {/* Textarea + extraction overlay */}
        <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
          <Textarea
            value={target}
            onChange={handleChange}
            disabled={isExtracting}
            style={{
              height: "100%",
              resize: "none",
              paddingTop: "16px",
              paddingBottom: "16px",
              opacity: isExtracting ? 0.4 : 1,
              transition: "opacity 0.2s",
            }}
            className="text-sm bg-white/30 backdrop-blur-lg border-white/45 border rounded-[16px] px-4 text-purple-950 placeholder:text-purple-950/30"
          />

          {/* Extraction overlay */}
          {isExtracting && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                zIndex: 20,
                backgroundColor: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(4px)",
              }}
            >
              <HashLoader color="#C4A882" size={35} />
            </div>
          )}
        </div>

        {/* Error toast — now OUTSIDE the textarea */}
        {fileError && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 235, 235, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(220,80,80,0.3)",
              borderRadius: "10px",
              padding: "8px 12px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#c0392b", flex: 1 }}>
              {fileError}
            </span>
            <button
              type="button"
              onClick={() => setFileError(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#c0392b",
                padding: 0,
                display: "flex",
              }}
            >
              <X style={{ width: 13, height: 13 }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
