import ObpLeaderboard from "@/components/ObpLeaderboard";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="mx-auto max-w-xl">
        <h1 className="mb-2 text-3xl font-bold">OBP+ Real Time</h1>
        <p className="mb-6 text-gray-600">
          See who’s trending up or down by On-Base Percentage (OBP) over the last 7 days.
        </p>
      </section>

      <ObpLeaderboard />
    </main>
  );
}