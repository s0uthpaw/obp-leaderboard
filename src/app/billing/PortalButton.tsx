"use client";

import { useTransition } from "react";
import { openBillingPortal } from "./actions";

export default function PortalButton() {
  const [pending, start] = useTransition();

  return (
    <button
      className="rounded-md border px-4 py-2 disabled:opacity-60"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await openBillingPortal();
          if (res.ok && res.url) {
            window.location.href = res.url;
          } else {
            alert(res.error ?? "Unable to open billing portal");
          }
        })
      }
    >
      {pending ? "Opening…" : "Open billing portal"}
    </button>
  );
}