// src/lib/bdl.ts
type FetchOpts = {
  path: string; // e.g., "/players"
  params?: Record<string, string | number | boolean | undefined>;
  init?: RequestInit; // allow overrides if needed
};

export async function bdlFetch<T>({ path, params = {}, init }: FetchOpts): Promise<T> {
  const base = process.env.NEXT_PUBLIC_BDL_BASE;
  if (!base) throw new Error("NEXT_PUBLIC_BDL_BASE is not set");

  const url = new URL(path, base.endsWith("/") ? base : base + "/");
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }

  // Server-only key: included in request headers; never exposed client-side
  const key = process.env.BDL_API_KEY;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(key ? { Authorization: key, "x-api-key": key } : {}), // covers common header styles
  };

  const res = await fetch(url.toString(), {
    cache: "no-store",
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string> | undefined) },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`BallDontLie ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}