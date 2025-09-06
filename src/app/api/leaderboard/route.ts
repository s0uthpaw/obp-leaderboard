import { NextResponse } from "next/server";

/**
 * Minimal placeholder leaderboard API:
 * Returns an empty rows array for now.
 * (No JSX, no Prisma, no external fetch yet.)
 */
export async function GET() {
  const rows: Array<{
    id: string;
    name: string;
    team?: string | null;
    pos?: string | null;
    obp7: number;
    obpPrev7: number;
    delta: number;
  }> = [];

  return NextResponse.json({ rows });
}