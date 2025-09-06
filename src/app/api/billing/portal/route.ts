/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  // 👇 In Clerk v6 this can be async in some setups—await it
  const { userId, orgId } = await auth();

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  try {
    const returnUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.concat("/billing") ?? "http://localhost:3000/billing";

    const subject = orgId ? { organizationId: orgId } : { userId };

    const session = await clerkClient.billing.createPortalSession({
      ...subject,
      returnUrl,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: unknown) { // 👈 no explicit any
    const message = err instanceof Error ? err.message : "Portal unavailable";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}