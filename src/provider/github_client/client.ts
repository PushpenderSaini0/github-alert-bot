import { trackedGithubUserName } from '@/constants';

import { getAllOpenPRs, getPRDetails } from './gql';
import { generatePullRequestSummaryFromGitHubPullRequestNode } from './transformation';

const getGithubClient = (bearerToken: string): GithubClient => {
  return {
    getAllOpenPRs: async (user: trackedGithubUserName) => {
      return getAllOpenPRsSummary(bearerToken, user);
    },
    getPRDetails: async (userOpenPullRequestDetailsBasic: PullRequestSummary) => {
      return getPRDetailsSummary(bearerToken, userOpenPullRequestDetailsBasic);
    },
  };
};

const getAllOpenPRsSummary = async (bearerToken: string, user: trackedGithubUserName): Promise<PullRequestSummary[]> => {
  const resp = await getAllOpenPRs(bearerToken, user);
  return resp.data.search.nodes.filter((pr) => !pr.isDraft).map((pr) => generatePullRequestSummaryFromGitHubPullRequestNode(pr));
};

const getPRDetailsSummary = async (bearerToken: string, prs: PullRequestSummary): Promise<PullRequestSummary> => {
  const resp = await getPRDetails(bearerToken, prs.repoOwner, prs.repoName, prs.pullNumber);
  return generatePullRequestSummaryFromGitHubPullRequestNode(resp.data.repository.pullRequest);
};

export default getGithubClient;
