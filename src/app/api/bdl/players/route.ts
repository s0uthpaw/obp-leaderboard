import { NextResponse } from "next/server";
import { bdlFetch } from "@/lib/bdl";

// Minimal, safe shape for BallDontLie players response
type BdlPlayersResponse =
  | { data?: unknown; meta?: unknown }
  | Record<string, unknown>;

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
    // NOTE: base should be https://mlb.balldontlie.io/api/v1 in your .env.local / Vercel
    const data = await bdlFetch<BdlPlayersResponse>({ path: "players", params });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}