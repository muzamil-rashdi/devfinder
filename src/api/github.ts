import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GitHubUser, GitHubRepo, GitHubSearchResults } from "../types/index";
import { GitHubUserDetailed,} from "../types/index";


const GITHUB_API_BASE = "https://api.github.com";
// Add to the existing API functions
export const getUserFollowers = (username: string, page = 1, perPage = 10) => {
  return fetchGitHub<GitHubUser[]>(
    `/users/${username}/followers?page=${page}&per_page=${perPage}`
  );
};

export const getUserFollowing = (username: string, page = 1, perPage = 10) => {
  return fetchGitHub<GitHubUser[]>(
    `/users/${username}/following?page=${page}&per_page=${perPage}`
  );
};

// Add React Query hooks for followers/following
export const useUserFollowers = (username: string, page: number) => {
  return useQuery<GitHubUser[], Error>({
    queryKey: ["userFollowers", username, page],
    queryFn: () => getUserFollowers(username, page),
    enabled: !!username,
  });
};

export const useUserFollowing = (username: string, page: number) => {
  return useQuery<GitHubUser[], Error>({
    queryKey: ["userFollowing", username, page],
    queryFn: () => getUserFollowing(username, page),
    enabled: !!username,
  });
};

const fetchGitHub = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Resource not found");
      } else if (response.status === 403) {
        throw new Error("API rate limit exceeded. Please try again later.");
      } else {
        throw new Error(`GitHub API error: ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const searchUsers = async (query: string, page = 1, perPage = 10) => {
  try {
    if (!query || query.trim().length === 0) {
      throw new Error("Search query is required");
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Ensure the response has the expected structure
    if (!data || typeof data !== 'object') {
      throw new Error("Invalid API response format");
    }

    return {
      total_count: data.total_count || 0,
      incomplete_results: data.incomplete_results || false,
      items: data.items || []
    };
  } catch (error) {
    console.error("Search users error:", error);
    throw error;
  }
};

export const getUser = (username: string) => {
  return fetchGitHub<GitHubUser>(`/users/${username}`);
};

export const getUserRepos = (username: string, page = 1, perPage = 10) => {
  return fetchGitHub<GitHubRepo[]>(
    `/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
  );
};

// React Query hooks
export const useSearchUsers = (
  query: string,
  page: number,
  options?: UseQueryOptions<GitHubSearchResults<GitHubUser>, Error>
) => {
return useQuery({
  queryKey: ["searchUsers", query, page],
  queryFn: () => searchUsers(query, page), // Simplified
  enabled: query.length > 2,
  ...options,
});
};

export const useUser = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
    enabled: !!username,
  });
};

export const useUserRepos = (username: string, page: number) => {
  return useQuery<GitHubRepo[], Error>({
    queryKey: ["userRepos", username, page],
    queryFn: () => getUserRepos(username, page),
    enabled: !!username,
  });
};
export const getUsersDetails = async (usernames: string[]): Promise<GitHubUserDetailed[]> => {
  const promises = usernames.map(username => getUser(username));
  return Promise.all(promises);
};
