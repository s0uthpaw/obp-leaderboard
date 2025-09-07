import { NextResponse } from "next/server";
import { bdlFetch } from "@/lib/bdl";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const params = {
    search: searchParams.get("search") || undefined,
    page: searchParams.get("page") || undefined,
    per_page: searchParams.get("per_page") || undefined,
    team: searchParams.get("team") || undefined,
    position: searchParams.get("position") || undefined,
  };

  try {
    const data = await bdlFetch<any>({ path: "/players", params });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 502 }
    );
  }
}