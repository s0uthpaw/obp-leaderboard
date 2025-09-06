// src/lib/db.ts
// Runtime-only Prisma import to avoid needing generated types during CI/build.

type GlobalWithPrisma = typeof globalThis & { prisma?: unknown };

// Reuse a single client in dev to avoid exhausting connections
const globalForPrisma = globalThis as GlobalWithPrisma;

export const prisma =
  (globalForPrisma.prisma as unknown) ??
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  new (require("@prisma/client").PrismaClient)();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}