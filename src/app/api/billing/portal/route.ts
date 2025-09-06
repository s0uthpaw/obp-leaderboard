import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Stubbed billing portal route to keep builds green until Billing SDK is wired.
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  // Return 501 to indicate not implemented yet; avoids type errors on clerkClient.billing
  return NextResponse.json(
    { ok: false, error: "Billing portal not configured yet" },
    { status: 501 }
  );
}