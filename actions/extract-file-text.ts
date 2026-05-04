"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTS: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  txt: "text/plain",
};

const ALLOWED_TYPES = new Set(
  Object.values(ALLOWED_EXTS).concat([
    "application/octet-stream",
    "application/zip",
    "application/x-zip-compressed",
  ]),
);

const MIME_TO_LABEL: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Word document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "Excel spreadsheet",
  "text/plain": "text file",
};

// Gemini supports these natively as inlineData
const GEMINI_NATIVE_TYPES = new Set(["application/pdf", "text/plain"]);

function resolveFileType(file: File): string | null {
  if (ALLOWED_TYPES.has(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_EXTS[ext] ?? null;
}

function resolveCanonicalMime(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ALLOWED_EXTS[ext]) return ALLOWED_EXTS[ext];
  if (ALLOWED_TYPES.has(file.type)) return file.type;
  return null;
}

// --- Pre-extraction for unsupported types ---

async function extractDocxText(buffer: ArrayBuffer): Promise<string> {
  const mammoth = await import("mammoth");
  const nodeBuffer = Buffer.from(buffer);
  const result = await mammoth.extractRawText({ buffer: nodeBuffer });
  return result.value;
}

async function extractXlsxText(buffer: ArrayBuffer): Promise<string> {
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(buffer, { type: "array" });
  return workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    return `Sheet: ${name}\n${XLSX.utils.sheet_to_csv(sheet)}`;
  }).join("\n\n");
}

async function preExtractText(
  file: File,
  canonicalMime: string,
  buffer: ArrayBuffer,
): Promise<string | null> {
  if (
    canonicalMime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return extractDocxText(buffer);
  }
  if (
    canonicalMime ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return extractXlsxText(buffer);
  }
  return null; // handled natively by Gemini
}

export async function extractTextFromFile(
  formData: FormData,
): Promise<{ success: boolean; text?: string; error?: string }> {
  const file = formData.get("file") as File | null;
  if (!file) return { success: false, error: "No file provided." };

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File too large. Max 5MB (yours: ${(file.size / 1024 / 1024).toFixed(1)}MB).`,
    };
  }

  const canonicalMime = resolveCanonicalMime(file);
  if (!canonicalMime) {
    return {
      success: false,
      error: "Unsupported file type. Use PDF, DOCX, XLSX, or TXT.",
    };
  }

  const fileBuffer = await file.arrayBuffer();
  const fileLabel = MIME_TO_LABEL[canonicalMime] ?? "file";

  // For DOCX/XLSX: pre-extract text, then send as plain text to Gemini for formatting
  const preExtracted = await preExtractText(file, canonicalMime, fileBuffer);

  const formatPrompt = `You are a document formatting assistant.

The user has uploaded a ${fileLabel} named "${file.name}". The raw text has been pre-extracted and is provided below.

Your task:
1. Preserve ALL meaningful content — do not summarise or omit anything.
2. Format cleanly using Markdown: headings (# / ## / ###), bullet/numbered lists, \`code\` blocks, **bold** for emphasis, and Markdown tables where applicable.
3. Output ONLY the formatted content — no commentary, preamble, or explanation.
4. If the content is empty, respond with: "The document appears to be empty or could not be parsed."

--- RAW CONTENT START ---
${preExtracted}
--- RAW CONTENT END ---`;

  const extractPrompt = `You are a document extraction and formatting assistant.

The user has uploaded a ${fileLabel} named "${file.name}".

Your task:
1. Extract ALL meaningful text content from this document.
2. Preserve logical structure: headings, sections, lists, tables, paragraphs.
3. Format cleanly using Markdown: # / ## / ### for headings, bullet/numbered lists, \`code\` blocks, **bold** for emphasis, Markdown tables.
4. Output ONLY the formatted extracted content — no commentary or preamble.
5. If the document is empty or unreadable, respond with: "The document appears to be empty or could not be parsed."`;

  let contents;

  if (preExtracted !== null) {
    // DOCX/XLSX: send pre-extracted text as plain text message
    contents = [
      {
        role: "user",
        parts: [{ text: formatPrompt }],
      },
    ];
  } else {
    // PDF / TXT: send as inlineData (Gemini native)
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    contents = [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: canonicalMime, data: base64Data } },
          { text: extractPrompt },
        ],
      },
    ];
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents,
  });

  const extractedText = response.text ?? "";

  if (!extractedText.trim()) {
    return {
      success: false,
      error: "Gemini returned an empty response. The file may be unreadable.",
    };
  }

  return { success: true, text: extractedText };
}
