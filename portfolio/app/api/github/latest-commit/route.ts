import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper to pick latest commit across repos
async function findLatestCommit(repos: any[], headers: any) {
  let latest: any = null;

  // Limit to first 50 repos to reduce rate usage
  const subset = repos.slice(0, 50);
  const concurrency = 8;
  let idx = 0;

  const worker = async () => {
    while (idx < subset.length) {
      const i = idx++;
      const repo = subset[i];
      try {
        const resp = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
          { headers, cache: "no-store" }
        );
        if (!resp.ok) continue;
        const commits = await resp.json();
        if (commits.length === 0) continue;
        const commit = commits[0];
        const commitDate = new Date(commit.commit.committer.date).getTime();
        if (!latest || commitDate > latest.dateMs) {
          latest = {
            repo: repo.name,
            repoUrl: repo.html_url,
            time: commit.commit.committer.date,
            isPrivate: repo.private,
            message: commit.commit.message.split("\n")[0],
            dateMs: commitDate,
          };
        }
      } catch {
        continue;
      }
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  if (latest) {
    const { dateMs, ...rest } = latest;
    return NextResponse.json(rest, {
      headers: { "Cache-Control": "no-store" },
    });
  }
  return NextResponse.json(
    { error: "No commits found" },
    { status: 404, headers: { "Cache-Control": "no-store" } }
  );
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      const response = await fetch(
        "https://api.github.com/users/hunter-broughton/events?per_page=50",
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
      const lastPush = events.find((e: any) => e.type === "PushEvent");
      if (lastPush) {
        return NextResponse.json(
          {
            repo: lastPush.repo.name.split("/")[1],
            repoUrl: `https://github.com/${lastPush.repo.name}`,
            time: lastPush.created_at,
            isPrivate: false,
          },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
      return NextResponse.json(
        { error: "No commits found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "hunters-website",
    };

    const reposResponse = await fetch(
      "https://api.github.com/user/repos?sort=pushed&direction=desc&per_page=100&affiliation=owner,collaborator,organization_member&visibility=all",
      { headers, cache: "no-store" }
    );

    if (!reposResponse.ok) {
      const eventsResponse = await fetch(
        "https://api.github.com/user/events?per_page=50",
        { headers, cache: "no-store" }
      );
      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        const lastPush = events.find((e: any) => e.type === "PushEvent");
        if (lastPush) {
          return NextResponse.json(
            {
              repo: lastPush.repo.name.split("/")[1],
              repoUrl: `https://github.com/${lastPush.repo.name}`,
              time: lastPush.created_at,
              isPrivate: false,
            },
            { headers: { "Cache-Control": "no-store" } }
          );
        }
      }
      throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
    }

    const repos = await reposResponse.json();
    return await findLatestCommit(repos, headers);
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
