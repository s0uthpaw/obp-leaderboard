// src/app/api/leaderboard/route.ts

import { NextResponse } from "next/server";

/**
 * Minimal, API-first leaderboard route.
 * - No Prisma
 * - No local formulas
 * - Ready to be swapped to fetch from BallDontLie (or any external API)
 *
 * Expected shape for the UI:
 * rows: Array<{
 *   id: string;
 *   name: string;
 *   team?: string | null;
 *   pos?: string | null;
 *   obp7: number;        // last 7d OBP
 *   obpPrev7: number;    // previous 7d OBP
 *   delta: number;       // obp7 - obpPrev7
 * }>
 */

export async function GET() {
  // TODO: Replace with real fetch to BallDontLie (or your chosen MLB API)
  // Example:
  // const resp = await fetch(`https://<balldontlie-mlb>/leaderboard?...`, { cache: "no-store" });
  // const data = await resp.json();
  // const rows = data.map(/* normalize to the shape above */);

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