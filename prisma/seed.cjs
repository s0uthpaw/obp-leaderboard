const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }

async function main() {
  await prisma.stat.deleteMany();
  await prisma.player.deleteMany();

  const judge = await prisma.player.create({ data: { name: "Aaron Judge", team: "NYY", pos: "OF" }});
  const soto  = await prisma.player.create({ data: { name: "Juan Soto",  team: "NYY", pos: "OF" }});
  const oht   = await prisma.player.create({ data: { name: "Shohei Ohtani", team: "LAD", pos: "DH" }});

  const start = new Date(); start.setDate(start.getDate() - 14);

  const lines = (playerId, boostFromDay = 7) =>
    Array.from({ length: 14 }).map((_, i) => {
      const date = addDays(start, i);
      const ab = 4;
      const bb = i % 5 === 0 ? 1 : 0;
      const hbp = 0, sf = 0;
      const hits = i < boostFromDay ? 1 : 2;
      return { playerId, date, ab, h: hits, bb, hbp, sf };
    });

  await prisma.stat.createMany({ data: lines(judge.id, 7) });
  await prisma.stat.createMany({ data: lines(soto.id, 10) });
  await prisma.stat.createMany({ data: lines(oht.id, 4) });
}

main().finally(() => prisma.$disconnect());