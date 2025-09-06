// src/app/sign-in/[[...sign-in]]/page.tsx
"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const sp = useSearchParams();
  const router = useRouter();
  const { isSignedIn } = useUser();

  const back =
    sp.get("redirect_url") || sp.get("redirectUrl") || "/dashboard";

  useEffect(() => {
    if (isSignedIn) router.replace(back);
  }, [isSignedIn, back, router]);

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: "0 1rem" }}>
      {!isSignedIn && <SignIn routing="hash" />}
    </main>
  );
}