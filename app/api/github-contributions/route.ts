import { NextResponse } from "next/server";

export async function GET() {
  const username = "kzxazka";

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 3600 }, // Cache contributions for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch contributions from GitHub: ${res.status}`);
    }

    const html = await res.text();

    // 1. Extract total contributions count in the last year
    // e.g. "1,482 contributions in the last year"
    const totalCommitsRegex = /(\d+[,.\d]*)\s+contributions?\s+in\s+the\s+last\s+year/i;
    const totalMatch = html.match(totalCommitsRegex);
    const totalCommits = totalMatch ? totalMatch[1] : "0";

    // 2. Parse calendar days from the HTML structure
    // Extract: <td ... class="ContributionCalendar-day" ... data-level="X" data-date="YYYY-MM-DD">
    const tdRegex = /<td[^>]+class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
    const levelRegex = /data-level="(\d)"/;
    const dateRegex = /data-date="([\d-]+)"/;

    const tds = html.match(tdRegex) || [];

    const days = tds
      .map((td) => {
        const levelMatch = td.match(levelRegex);
        const dateMatch = td.match(dateRegex);
        return {
          level: levelMatch ? parseInt(levelMatch[1], 10) : 0,
          date: dateMatch ? dateMatch[1] : "",
        };
      })
      .filter((day) => day.date !== "");

    // 3. Construct a 7 (days of week) x 32 (weeks) grid representing the last 32 weeks
    const totalCells = 7 * 32; // 224 cells
    const last224Days = days.slice(-totalCells);

    // If we don't have enough days, pad with empty cells at the start
    while (last224Days.length < totalCells) {
      last224Days.unshift({ level: 0, date: "" });
    }

    const grid: number[][] = [];
    for (let r = 0; r < 7; r++) {
      const row: number[] = [];
      for (let c = 0; c < 32; c++) {
        // Index is calculated column-wise: c * 7 + r
        const dayIndex = c * 7 + r;
        const day = last224Days[dayIndex];
        row.push(day ? day.level : 0);
      }
      grid.push(row);
    }

    return NextResponse.json({
      totalCommits,
      grid,
    });
  } catch (error) {
    console.error("GitHub contributions fetch failed:", error);
    // Graceful fallback to avoid page breaking
    return NextResponse.json({
      totalCommits: "0",
      grid: Array(7).fill(null).map(() => Array(32).fill(0)),
    });
  }
}
