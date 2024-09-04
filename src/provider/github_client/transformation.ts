import { STRING_APPROVED } from '@/constants/';

const getUniqKeyFromPullRequestDetailsBasicDBO = (pullRequestDetailsBasicDBO: PullRequestSummary): string => {
  return [
    pullRequestDetailsBasicDBO.repoOwner,
    pullRequestDetailsBasicDBO.repoName,
    pullRequestDetailsBasicDBO.pullNumber,
    pullRequestDetailsBasicDBO.author.login,
  ].join('/');
};

const generatePullRequestSummaryFromGitHubPullRequestNode = (prNode: GitHubGQL.PullRequestNode): PullRequestSummary => {
  return {
    pullNumber: prNode.number,
    repoName: prNode.repository.name,
    repoOwner: prNode.repository.owner.login,
    author: prNode.author,
    title: prNode.title,
    state: prNode.state,
    reviewDecision: prNode.reviewDecision,
    createdAt: prNode.createdAt,
    closedAt: prNode.closedAt,
    mergedAt: prNode.mergedAt,
    baseRefName: prNode.baseRefName,
    headRefName: prNode.headRefName,
    isClosed: prNode.closed,
    isDraft: prNode.isDraft,
    webUrl: prNode.url,
    mergedBy: prNode.mergedBy,
    isApproved: prNode.reviews.nodes.some((review) => review.state === STRING_APPROVED),
    approvedBy: prNode.reviews.nodes.filter((review) => review.state === STRING_APPROVED).map((review) => review.author.login),
  };
};

const generatePullRequestPoolFromPullRequestSummaryList = (pullRequestSummaryList: PullRequestSummary[]): PullRequestPool => {
  const pullRequestPool: PullRequestPool = {};
  pullRequestSummaryList.forEach((prSummary) => {
    const key = getUniqKeyFromPullRequestDetailsBasicDBO(prSummary);
    pullRequestPool[key] = prSummary;
  });
  return pullRequestPool;
};

export {
  generatePullRequestSummaryFromGitHubPullRequestNode,
  generatePullRequestPoolFromPullRequestSummaryList,
  getUniqKeyFromPullRequestDetailsBasicDBO,
};
