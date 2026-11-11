import type { HeatmapColumn } from "@/components/charts/heatmap";

export const DEMO_PHONE = "+7 916 000-00-01";
export const DEMO_PASSWORD = "demo-pass-123";

export const member = {
  name: "Анна",
  plan: "Год",
  totalDays: 365,
  daysLeft: 241,
  personalLeft: 5,
  passCode: "SVOYA-0001-7F3K",
};

/** Deterministic pseudo-random so the demo looks the same on every visit. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * 16 weeks of visits. Columns are Sunday-first weeks (the chart rotates them
 * to Monday-first via `weekStartDay={1}`). Visits cluster on Mon/Wed/Fri,
 * like a member who trains three times a week.
 */
export function visitHeatmap(today = new Date()): HeatmapColumn[] {
  const rnd = seeded(42);
  const weeks = 16;
  const end = new Date(today);
  end.setHours(0, 0, 0, 0);
  // Sunday that starts the current week
  const sunday = new Date(end);
  sunday.setDate(end.getDate() - end.getDay());
  const start = new Date(sunday);
  start.setDate(sunday.getDate() - (weeks - 1) * 7);

  return Array.from({ length: weeks }, (_, w) => ({
    bin: w,
    bins: Array.from({ length: 7 }, (_, d) => {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const future = date > end;
      const favourite = d === 1 || d === 3 || d === 5;
      const p = favourite ? 0.8 : 0.15;
      const count = future ? 0 : rnd() < p ? (rnd() < 0.25 ? 2 : 1) : 0;
      return { bin: d, count, date };
    }),
  }));
}
