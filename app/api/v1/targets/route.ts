import { NextRequest, NextResponse } from "next/server";
import { supabase } from "lib/supabase";

type CourseTargetByGradeGroup = {
    grade_group_name: string;
    subject_name: string;
    target: string;
};

export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.rpc("get_course_targets_by_grade_group");
    const targets = data as CourseTargetByGradeGroup[] | null;

    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
            { error: "Error getting course targets" },
            { status: 500 }
        );
    }

    return NextResponse.json(data ?? [], { status: 200 });
}