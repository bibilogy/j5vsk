export async function POST(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.rpc("get_course_targets_by_grade_group");
    if (error) {
        return NextResponse.json({ error: "Error getting course targets" }, { status: 500 });
    }

    return NextResponse.json(data ?? [], {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        },
    });
}

// Handle preflight OPTIONS request
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        },
    });
}