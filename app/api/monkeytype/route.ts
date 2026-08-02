import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.MONKEYTYPE_API_KEY;

  if (!apiKey) {
    // If API key is not configured, return default fallback values
    return NextResponse.json({ wpm: 120, accuracy: 98 });
  }

  try {
    const res = await fetch("https://api.monkeytype.com/users/personal/profile", {
      headers: {
        Authorization: `ApeKey ${apiKey}`,
      },
      next: { revalidate: 3600 }, // Cache on Vercel CDN for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Monkeytype API responded with status ${res.status}`);
    }

    const json = await res.json();
    const data = json.data;

    let wpm = 0;
    let accuracy = 0;

    // Traverse the personal best time records (15s, 30s, 60s, 120s)
    const timeTests = data?.personalBests?.time;
    if (timeTests) {
      for (const seconds of ["15", "30", "60", "120"]) {
        const tests = timeTests[seconds];
        if (Array.isArray(tests) && tests.length > 0) {
          // Monkeytype sorts these by WPM descending, so index 0 is the highest WPM
          const bestTest = tests[0];
          if (bestTest && bestTest.wpm > wpm) {
            wpm = Math.round(bestTest.wpm);
            accuracy = Math.round(bestTest.acc);
          }
        }
      }
    }

    // Fallback if the user has an account but hasn't taken any time tests yet
    if (wpm === 0) {
      wpm = 95;
      accuracy = 97;
    }

    return NextResponse.json({ wpm, accuracy });
  } catch (error) {
    console.error("Failed to fetch Monkeytype stats:", error);
    // Graceful fallback to avoid page breaking
    return NextResponse.json({ wpm: 95, accuracy: 97 });
  }
}
