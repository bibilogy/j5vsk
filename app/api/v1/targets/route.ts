import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type CourseTargetByGradeGroup = {
    grade_group_name: string;
    subject_name: string;
    target: string;
};

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
};

// api/v1/targets/route.ts
export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: CORS_HEADERS });
    }

    const { data, error } = await supabase.rpc("get_course_targets_by_grade_group");
    if (error) {
        return NextResponse.json({ error: "Error getting course targets" }, { status: 500, headers: CORS_HEADERS });
    }

    return NextResponse.json(data ?? [], { status: 200, headers: CORS_HEADERS });
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}