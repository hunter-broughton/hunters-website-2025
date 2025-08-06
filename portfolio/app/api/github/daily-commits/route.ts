import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    // Get today's date range in your local timezone (PST/PDT)
    const today = new Date();
    const userTimezone = "America/Los_Angeles"; // Adjust if needed

    // Create date in user's timezone
    const todayInUserTZ = new Date(
      today.toLocaleString("en-US", { timeZone: userTimezone })
    );
    const startOfDay = new Date(
      todayInUserTZ.getFullYear(),
      todayInUserTZ.getMonth(),
      todayInUserTZ.getDate()
    ).toISOString();
    const endOfDay = new Date(
      todayInUserTZ.getFullYear(),
      todayInUserTZ.getMonth(),
      todayInUserTZ.getDate() + 1
    ).toISOString();

    if (!token) {
      // Fallback to public API if no token is provided
      const response = await fetch(
        "https://api.github.com/users/hunter-broughton/events?per_page=100",
        {
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
          eventInUserTZ.toDateString() === todayInUserTZ.toDateString() &&
          event.type === "PushEvent"
        );
      });

      // Count commits from push events
      let todayCommits = 0;
      todayEvents.forEach((event: any) => {
        if (event.payload && event.payload.commits) {
          todayCommits += event.payload.commits.length;
        }
      });

      return NextResponse.json({ count: todayCommits });
    } else {
      // Use authenticated API to get commits from all repos (including private)
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "hunters-website",
      };

      // First, get all repositories
      const reposResponse = await fetch(
        "https://api.github.com/user/repos?sort=pushed&per_page=100&affiliation=owner&visibility=all",
        { headers }
      );

      if (!reposResponse.ok) {
        // Fallback to events API if repos API fails
        const eventsResponse = await fetch(
          "https://api.github.com/user/events?per_page=100",
          { headers }
        );

        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`);
        }

        const events = await eventsResponse.json();
        const todayEvents = events.filter((event: any) => {
          const eventDate = new Date(event.created_at);
          return (
            eventDate.toDateString() === today.toDateString() &&
            event.type === "PushEvent"
          );
        });

        let todayCommits = 0;
        todayEvents.forEach((event: any) => {
          if (event.payload && event.payload.commits) {
            todayCommits += event.payload.commits.length;
          }
        });

        return NextResponse.json({ count: todayCommits });
      }

      const repos = await reposResponse.json();
      let totalCommits = 0;

      // Check commits in each repository for today
      for (const repo of repos) {
        try {
          // Use since parameter to only get commits from today
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?author=hunter-broughton&since=${startOfDay}&until=${endOfDay}&per_page=100`,
            { headers }
          );

          if (commitsResponse.ok) {
            const commits = await commitsResponse.json();
            totalCommits += commits.length;
          }
        } catch (error) {
          // Skip repos that we can't access
          continue;
        }
      }

      return NextResponse.json({ count: totalCommits });
    }
  } catch (error) {
    console.error("Error fetching daily commits:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily commits" },
      { status: 500 }
    );
  }
}
