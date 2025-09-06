import { NextResponse } from "next/server";

/**
 * Minimal placeholder leaderboard API:
 * - No Prisma
 * - No local formulas
 * - Returns an empty rows array for now
 * Swap the TODO to fetch from BallDontLie when ready.
 */
export async function GET() {
  // TODO: fetch external data and normalize to the expected shape
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