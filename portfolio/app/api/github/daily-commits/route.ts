import { NextResponse } from "next/server";

// Force dynamic rendering & disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

const USERNAME = "hunter-broughton";
const USER_TIMEZONE = "America/Los_Angeles";
const ZERO_SHA = "0000000000000000000000000000000000000000";

function buildHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "hunters-website",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function isToday(iso: string, nowInTZ: Date): boolean {
  const eventInTZ = new Date(
    new Date(iso).toLocaleString("en-US", { timeZone: USER_TIMEZONE })
  );
  return eventInTZ.toDateString() === nowInTZ.toDateString();
}

// Count the commits contained in a single push using the compare API.
// This works for PRIVATE repos when an auth token is supplied. The events
// API no longer includes commit counts in its payload, so we derive the
// count from the before/head SHAs instead.
async function countPushCommits(
  repo: string,
  before: string | undefined,
  head: string | undefined,
  headers: Record<string, string>
): Promise<number> {
  // Brand-new branch (no prior SHA) can't be compared; count the head commit.
  if (!before || before === ZERO_SHA) {
    return head ? 1 : 0;
  }
  if (!head) return 0;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/compare/${before}...${head}`,
      { headers, cache: "no-store" }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return typeof data.total_commits === "number" ? data.total_commits : 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  // Today's date in Pacific Time
  const now = new Date();
  const nowInTZ = new Date(
    now.toLocaleString("en-US", { timeZone: USER_TIMEZONE })
  );

  const token = process.env.GITHUB_TOKEN;
  const headers = buildHeaders(token);

  try {
    // 1 call: the authenticated events feed includes private repo PushEvents.
    // (Without a token, only public events are returned.)
    const eventsRes = await fetch(
      `https://api.github.com/users/${USERNAME}/events?per_page=100`,
      { headers, cache: "no-store" }
    );

    if (!eventsRes.ok) {
      throw new Error(`Failed to fetch events: ${eventsRes.status}`);
    }

    const events = await eventsRes.json();
    const todaysPushes = (Array.isArray(events) ? events : []).filter(
      (e: any) => e.type === "PushEvent" && isToday(e.created_at, nowInTZ)
    );

    // One compare call per push today to count its commits. Pushes per day are
    // few, so this stays well within rate limits (unlike scanning every repo).
    const counts = await Promise.all(
      todaysPushes.map((e: any) =>
        countPushCommits(
          e.repo.name,
          e.payload?.before,
          e.payload?.head,
          headers
        )
      )
    );

    const count = counts.reduce((sum, n) => sum + n, 0);

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching daily commits:", error);
    return NextResponse.json(
      { count: 0 },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
