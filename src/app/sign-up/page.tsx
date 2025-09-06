"use client";

import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div />}>
      <SignUp />
    </Suspense>
  );
}