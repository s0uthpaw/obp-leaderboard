import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  const { userId, orgId } = auth();
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  try {
    const returnUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.concat("/billing") ?? "http://localhost:3000/billing";

    const subject = orgId ? { organizationId: orgId } : { userId };

    // If your SDK method name differs, adjust here:
    const session = await clerkClient.billing.createPortalSession({
      ...subject,
      returnUrl,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Portal unavailable" }, { status: 500 });
  }
}