import { NextResponse } from "next/server";

// Helper function to process repositories and find latest commit
async function processRepos(repos: any[], headers: any) {
  if (repos.length > 0) {
    // Get the most recently pushed repository
    const latestRepo = repos[0];

    // Fetch the latest commit from that repository
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${latestRepo.full_name}/commits?per_page=1`,
      { headers }
    );

    if (!commitsResponse.ok) {
      throw new Error(`Failed to fetch commits: ${commitsResponse.status}`);
    }

    const commits = await commitsResponse.json();

    if (commits.length > 0) {
      const latestCommit = commits[0];
      
      return NextResponse.json({
        repo: latestRepo.name,
        repoUrl: latestRepo.html_url,
        time: latestCommit.commit.committer.date,
        isPrivate: latestRepo.private,
        message: latestCommit.commit.message.split('\n')[0] // First line of commit message
      });
    }
  }
  
  return NextResponse.json({ error: 'No commits found' }, { status: 404 });
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      // Fallback to public API if no token is provided
      const response = await fetch(
        "https://api.github.com/users/hunter-broughton/events?per_page=20",
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
      const lastPush = events.find((event: any) => event.type === "PushEvent");

      if (lastPush) {
        return NextResponse.json({
          repo: lastPush.repo.name.split("/")[1],
          repoUrl: `https://github.com/${lastPush.repo.name}`,
          time: lastPush.created_at,
          isPrivate: lastPush.repo.name.includes("private"),
        });
      }
    } else {
      // Use authenticated API to get private repos
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "hunters-website",
      };

      // Get all repositories (including private) sorted by recent activity
      const reposResponse = await fetch(
        "https://api.github.com/user/repos?sort=pushed&per_page=50&affiliation=owner&visibility=all",
        { headers }
      );

      if (!reposResponse.ok) {
        const errorText = await reposResponse.text();
        
        // Try alternative endpoint
        const altResponse = await fetch(
          "https://api.github.com/user/repos?sort=pushed&per_page=50&type=all",
          { headers }
        );
        
        if (!altResponse.ok) {
          throw new Error(`Failed to fetch repositories: ${reposResponse.status} - ${errorText}`);
        }
        
        const altRepos = await altResponse.json();
        return processRepos(altRepos, headers);
      }

      const repos = await reposResponse.json();
      return await processRepos(repos, headers);
    }

    return NextResponse.json({ error: "No commits found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
