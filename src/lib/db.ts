// src/lib/db.ts
// Runtime-only Prisma import so CI/build doesn't need generated types.

/* eslint-disable @typescript-eslint/no-require-imports */

type GlobalWithPrisma = typeof globalThis & { prisma?: unknown };

// Reuse a single client in dev to avoid exhausting connections
const globalForPrisma = globalThis as GlobalWithPrisma;

const PrismaClient = (require("@prisma/client").PrismaClient as unknown as {
  new (): unknown;
});

export const prisma =
  (globalForPrisma.prisma as unknown) ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}