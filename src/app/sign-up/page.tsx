"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: "0 1rem" }}>
      <SignUp routing="hash" />
    </main>
  );
}