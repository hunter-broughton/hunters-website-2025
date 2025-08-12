import { NextResponse } from "next/server";

// Force dynamic rendering & disable caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    // Get today's date range in Pacific Time (adjust if needed)
    const userTimezone = "America/Los_Angeles";
    const now = new Date();
    const nowInTZ = new Date(
      now.toLocaleString("en-US", { timeZone: userTimezone })
    );
    const startOfDayLocal = new Date(
      nowInTZ.getFullYear(),
      nowInTZ.getMonth(),
      nowInTZ.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDayLocal = new Date(
      startOfDayLocal.getTime() + 24 * 60 * 60 * 1000
    );

    // Convert to UTC ISO strings for GitHub API since/ until parameters
    const startOfDay = startOfDayLocal.toISOString();
    const endOfDay = endOfDayLocal.toISOString();

    if (!token) {
      // Fallback to public API if no token is provided (public events only)
      const response = await fetch(
        "https://api.github.com/users/hunter-broughton/events?per_page=100",
        {
          cache: "no-store",
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "hunters-website",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch public events: ${response.status}`);
      }

      const events = await response.json();
      const todayEvents = events.filter((event: any) => {
        const eventDate = new Date(event.created_at);
        const eventInUserTZ = new Date(
          eventDate.toLocaleString("en-US", { timeZone: userTimezone })
        );
        return (
          eventInUserTZ.toDateString() === nowInTZ.toDateString() &&
          event.type === "PushEvent"
        );
      });

      let todayCommits = 0;
      todayEvents.forEach((event: any) => {
        if (event.payload && event.payload.commits) {
          todayCommits += event.payload.commits.length;
        }
      });

      return NextResponse.json(
        { count: todayCommits },
        { headers: { "Cache-Control": "no-store" } }
      );
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "hunters-website",
      };

      // Get repositories sorted by most recent push (descending)
      const reposResponse = await fetch(
        "https://api.github.com/user/repos?sort=pushed&direction=desc&per_page=100&affiliation=owner,collaborator,organization_member&visibility=all",
        { headers, cache: "no-store" }
      );

      if (!reposResponse.ok) {
        // Fallback to authenticated events API if repos API fails
        const eventsResponse = await fetch(
          "https://api.github.com/user/events?per_page=100",
          { headers, cache: "no-store" }
        );

        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`);
        }

        const events = await eventsResponse.json();
        const todayEvents = events.filter((event: any) => {
          const eventDate = new Date(event.created_at);
          const eventInUserTZ = new Date(
            eventDate.toLocaleString("en-US", { timeZone: userTimezone })
          );
          return (
            eventInUserTZ.toDateString() === nowInTZ.toDateString() &&
            event.type === "PushEvent"
          );
        });

        let todayCommits = 0;
        todayEvents.forEach((event: any) => {
          if (event.payload && event.payload.commits) {
            todayCommits += event.payload.commits.length;
          }
        });

        return NextResponse.json(
          { count: todayCommits },
          { headers: { "Cache-Control": "no-store" } }
        );
      }

      const repos = await reposResponse.json();

      // Fetch commits in parallel with limited concurrency to avoid rate limits
      const concurrency = 8;
      let index = 0;
      let totalCommits = 0;

      const worker = async () => {
        while (index < repos.length) {
          const i = index++;
          const repo = repos[i];
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${repo.full_name}/commits?author=hunter-broughton&since=${startOfDay}&until=${endOfDay}&per_page=100`,
              { headers, cache: "no-store" }
            );
            if (commitsResponse.status === 403) {
              // Rate limited: break early and use what we have
              return;
            }
            if (commitsResponse.ok) {
              const commits = await commitsResponse.json();
              totalCommits += commits.length;
            }
          } catch {
            continue;
          }
        }
      };

      await Promise.all(Array.from({ length: concurrency }, () => worker()));

      return NextResponse.json(
        { count: totalCommits },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
  } catch (error) {
    console.error("Error fetching daily commits:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily commits" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
