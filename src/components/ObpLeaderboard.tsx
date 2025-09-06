"use client";
import { useEffect, useState } from "react";

type Row = {
  id: string;
  name: string;
  team?: string | null;
  pos?: string | null;
  obp7: number;
  obpPrev7: number;
  delta: number;
};

export default function ObpLeaderboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/leaderboard");
      const json = await res.json();
      setRows(json.rows ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="text-sm text-gray-500">Loading leaderboard…</div>;
  if (!rows.length) return <div className="text-sm text-gray-500">No data yet.</div>;

  return (
    <section className="w-full mt-10">
      <h2 className="mb-3 text-xl font-semibold">OBP Trend — Last 7d vs Prior 7d</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2 text-left hidden md:table-cell">Team</th>
              <th className="px-3 py-2 text-left hidden md:table-cell">Pos</th>
              <th className="px-3 py-2 text-right">OBP (7d)</th>
              <th className="px-3 py-2 text-right hidden sm:table-cell">Prev 7d</th>
              <th className="px-3 py-2 text-right">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
              >
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2 hidden md:table-cell">{r.team ?? "—"}</td>
                <td className="px-3 py-2 hidden md:table-cell">{r.pos ?? "—"}</td>
                <td className="px-3 py-2 text-right tabular-nums">{r.obp7.toFixed(3)}</td>
                <td className="px-3 py-2 text-right hidden sm:table-cell tabular-nums">
                  {r.obpPrev7.toFixed(3)}
                </td>
                <td
                  className={`px-3 py-2 text-right tabular-nums ${
                    r.delta >= 0 ? "text-emerald-500" : "text-rose-400"
                  }`}
                >
                  {r.delta >= 0 ? "▲" : "▼"} {Math.abs(r.delta).toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        OBP = (H + BB + HBP) / (AB + BB + HBP + SF). Trend = last 7d minus prior 7d.
      </p>
    </section>
  );
}