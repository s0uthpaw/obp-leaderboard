"use client";
import { useTransition } from "react";

export default function PortalButton() {
  const [pending, startTransition] = useTransition();

  const onClick = () =>
    startTransition(async () => {
      try {
        const res = await fetch("/api/billing/portal", { method: "POST" });
        const data = await res.json();

        if (data?.url) {
          window.location.href = data.url as string;
        } else {
          alert(data?.error ?? "Billing portal not available yet.");
        }
      } catch {
        alert("Billing portal not available yet.");
      }
    });

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
    >
      {pending ? "Opening…" : "Open Billing Portal"}
    </button>
  );
}