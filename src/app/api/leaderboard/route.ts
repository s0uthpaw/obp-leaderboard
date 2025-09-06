import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// OBP formula
function obp(h: number, bb: number, hbp: number, ab: number, sf: number) {
  const denom = ab + bb + hbp + sf;
  return denom === 0 ? 0 : (h + bb + hbp) / denom;
}

export async function GET() {
  const today = new Date();
  const d7 = new Date(); d7.setDate(today.getDate() - 7);
  const d14 = new Date(); d14.setDate(today.getDate() - 14);

  // Last 14 days of stats
  const stats = await prisma.stat.findMany({
    where: { date: { gte: d14 } },
    include: { player: true },
  });

  type Agg = { ab: number; h: number; bb: number; hbp: number; sf: number };
  const acc: Record<string, { last7: Agg; prev7: Agg; player: any }> = {};

  for (const s of stats) {
    const key = s.playerId;
    acc[key] ??= {
      last7: { ab: 0, h: 0, bb: 0, hbp: 0, sf: 0 },
      prev7: { ab: 0, h: 0, bb: 0, hbp: 0, sf: 0 },
      player: s.player,
    };
    const bucket = s.date >= d7 ? "last7" : "prev7";
    acc[key][bucket].ab += s.ab;
    acc[key][bucket].h += s.h;
    acc[key][bucket].bb += s.bb;
    acc[key][bucket].hbp += s.hbp;
    acc[key][bucket].sf += s.sf;
  }

  const rows = Object.values(acc).map(({ last7, prev7, player }) => {
    const obp7 = obp(last7.h, last7.bb, last7.hbp, last7.ab, last7.sf);
    const obpP7 = obp(prev7.h, prev7.bb, prev7.hbp, prev7.ab, prev7.sf);
    const delta = obp7 - obpP7;
    return {
      id: player.id,
      name: player.name,
      team: player.team,
      pos: player.pos,
      obp7: Number(obp7.toFixed(3)),
      obpPrev7: Number(obpP7.toFixed(3)),
      delta: Number(delta.toFixed(3)),
    };
  }).sort((a, b) => b.delta - a.delta);

  return NextResponse.json({ rows });
}