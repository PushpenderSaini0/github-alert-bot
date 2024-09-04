import {
  APP_USER_AGENT,
  CONTENT_TYPE_JSON,
  GITHUB_GRAPHQL_ENDPOINT,
  HEADER_AUTHORIZATION,
  HEADER_CONTENT_TYPE,
  HEADER_USER_AGENT,
  HTTP_METHOD_POST,
  trackedGithubUserName,
} from '@/constants';

const executeGraphQLQuery = async (bearerToken: string, query: string, variables: Record<string, unknown>) => {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: HTTP_METHOD_POST,
    headers: {
      [HEADER_AUTHORIZATION]: `Bearer ${bearerToken}`,
      [HEADER_USER_AGENT]: APP_USER_AGENT,
      [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON,
    },
    body: JSON.stringify({ query, variables }),
  });
  return await response.json();
};

const getAllOpenPRs = async (bearerToken: string, user: trackedGithubUserName) => {
  const queryTemplate = `
  query ($search_query: String!) {
    search(query: $search_query, type: ISSUE, first: 100) {
      nodes {
        ... on PullRequest {
          number
          author {
            login
            avatarUrl
          }
          title
          state
          reviewDecision
          createdAt
          closedAt
          mergedAt
          baseRefName
          headRefName
          closed
          isDraft
          url
          mergedBy {
            login
            avatarUrl
          }
          repository {
            name
            owner {
              login
              avatarUrl
            }
          }
          reviews(first: 100) {
            nodes {
              author {
                login
                avatarUrl
              }
              state
            }
            pageInfo {
              endCursor
              startCursor
              hasNextPage
              hasPreviousPage
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }`;
  const variables = { search_query: `author:${user} is:open type:pr archived:false user:cdapio user:data-integrations` };
  return (await executeGraphQLQuery(bearerToken, queryTemplate, variables)) as GitHubGQL.SearchApiResponse;
};

const getPRDetails = async (bearerToken: string, owner: string, repo: string, pull_number: number) => {
  const queryTemplate = `
  query ($owner: String!, $repo: String!, $pull_number: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $pull_number) {
        number
        author {
          login
          avatarUrl
        }
        title
        state
        reviewDecision
        createdAt
        closedAt
        mergedAt
        baseRefName
        headRefName
        closed
        isDraft
        url
        mergedBy {
          login
          avatarUrl
        }
        repository {
          name
          owner {
            login
            avatarUrl
          }
        }
        reviews(first: 100) {
          nodes {
            author {
              login
              avatarUrl
            }
            state
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  }`;
  const variables = { owner, repo, pull_number };
  return (await executeGraphQLQuery(bearerToken, queryTemplate, variables)) as GitHubGQL.PullRequestApiResponse;
};

export { getAllOpenPRs, getPRDetails };
