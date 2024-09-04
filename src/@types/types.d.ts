/* Chat Client */
interface ChatClient {
  sendTextMessage: (message: string) => Promise<Global.Response>;
  sendCardMessage: (ChatCardContainers: ChatCardContainer[], text?: string) => Promise<Global.Response>;
}

type ChatTextMessage = {
  text: string;
};

type ChatCardMessage = {
  text: string;
  cardsV2: ChatCardContainer[];
};

type ChatCardContainer = {
  card: any;
};

namespace GitHubGQL {
  interface PullRequestApiResponse {
    data: {
      repository: {
        pullRequest: PullRequestNode;
      };
    };
  }

  interface SearchApiResponse {
    data: {
      search: Search;
    };
  }

  interface Search {
    nodes: PullRequestNode[];
    pageInfo: PageInfo;
  }

  interface PullRequestNode {
    number: number;
    author: Author;
    title: string;
    state: string;
    reviewDecision?: string;
    createdAt: string;
    closedAt?: string;
    mergedAt?: string;
    baseRefName: string;
    headRefName: string;
    closed: boolean;
    isDraft: boolean;
    url: string;
    mergedBy?: Author;
    repository: Repository;
    reviews: Reviews;
  }

  interface Author {
    login: string;
    avatarUrl: string;
  }

  interface Repository {
    name: string;
    owner: Owner;
  }

  interface Owner {
    login: string;
    avatarUrl: string;
  }

  interface Reviews {
    nodes: ReviewNode[];
    pageInfo: PageInfo;
  }

  interface ReviewNode {
    author: Author;
    state: string;
  }

  interface PageInfo {
    endCursor?: string;
    startCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}

/* GitHubClient */
interface GithubClient {
  getAllOpenPRs: (user: trackedGithubUserName) => Promise<PullRequestSummary[]>;
  getPRDetails: (userOpenPullRequestDetailsBasic: PullRequestSummary) => Promise<PullRequestSummary>;
}

interface PullRequestPool {
  [key: string]: PullRequestSummary;
}

interface GithubUserNameMap {
  [key: string]: string;
}

type PullRequestSummary = {
  pullNumber: number;
  repoOwner: string;
  repoName: string;
  baseRefName: string;
  headRefName: string;
  isDraft: boolean;
  webUrl: string;
  reviewDecision?: string;
  author: {
    login: string;
    avatarUrl: string;
  };
  title: string;
  state: string;
  createdAt: string;
  closedAt?: string;
  mergedAt?: string;
  isClosed: boolean;
  mergedBy?: {
    login: string;
    avatarUrl: string;
  };
  isApproved: boolean;
  approvedBy: string[];
};
