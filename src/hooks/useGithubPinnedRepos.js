import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch GitHub pinned repositories
 * @param {string} username - GitHub username
 * @returns {Object} - { projects, loading, error }
 */
export const useGithubPinnedRepos = (username) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchPinnedReposGraphQL = async () => {
      const query = `
        query {
          user(login: "${username}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  homepageUrl
                  primaryLanguage {
                    name
                  }
                  languages(first: 5) {
                    nodes {
                      name
                    }
                  }
                  repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      if (!data.data || !data.data.user) {
        throw new Error('GitHub user not found');
      }

      return data.data.user.pinnedItems.nodes.map((repo) => {
        const languageTags = repo.languages.nodes.map(lang => lang.name);
        const topicTags = repo.repositoryTopics.nodes.map(topic => topic.topic.name);
        const allTags = [...new Set([...languageTags, ...topicTags])];

        return {
          title: repo.name,
          description: repo.description || 'No description provided',
          link: repo.homepageUrl || repo.url,
          tags: allTags.slice(0, 5),
        };
      });
    };

    const fetchReposREST = async () => {
      // Fallback to REST API: fetch user's repos sorted by stars
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6&type=owner`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const repos = await response.json();

      return repos.map((repo) => ({
        title: repo.name,
        description: repo.description || 'No description provided',
        link: repo.homepage || repo.html_url,
        tags: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 5),
      }));
    };

    const fetchPinnedRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        let transformedProjects;

        // Try GraphQL API if token is available, otherwise use REST API
        if (import.meta.env.VITE_GITHUB_TOKEN) {
          try {
            transformedProjects = await fetchPinnedReposGraphQL();
          } catch (graphqlError) {
            console.warn('GraphQL fetch failed, falling back to REST API:', graphqlError);
            transformedProjects = await fetchReposREST();
          }
        } else {
          transformedProjects = await fetchReposREST();
        }

        setProjects(transformedProjects);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching GitHub repos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, [username]);

  return { projects, loading, error };
};
