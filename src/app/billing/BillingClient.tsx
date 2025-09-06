/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function BillingClient() {
  const openPortal = async () => {
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        credentials: "include", // <-- send cookies/session
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? `Request failed (${res.status})`);
      }
    } catch (e: any) {
      alert(e?.message ?? "Network error");
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Manage Billing</h1>
      <button
        type="button"
        onClick={openPortal}
        style={{ padding: "8px 12px", border: "1px solid #000", borderRadius: 6, cursor: "pointer" }}
      >
        Open billing portal
      </button>
    </main>
  );
}