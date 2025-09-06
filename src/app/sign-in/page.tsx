"use client";

import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic"; // avoid static export issues

export default function SignInPage() {
  return (
    <Suspense fallback={<div />}>
      <SignIn />
    </Suspense>
  );
}