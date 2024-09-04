import { prInfoCard } from '@/templates/pr_info_card';

type DiffResult = {
  didChange: boolean;
  message: string;
  extraInfo?: string;
};

const diffPRSummary = async (chatClient: ChatClient, oldState: PullRequestSummary, newState: PullRequestSummary) => {
  const diffResults = [diffTitle(oldState, newState), diffIsApproved(oldState, newState), diffMerged(oldState, newState)];
  for (const diffResult of diffResults) {
    if (diffResult.didChange) {
      const cards = [{ card: prInfoCard(diffResult.message, diffResult.extraInfo ? diffResult.extraInfo : '-', newState) }];
      await chatClient.sendCardMessage(cards);
    }
  }
};

const diffTitle = (oldState: PullRequestSummary, newState: PullRequestSummary): DiffResult => {
  if (oldState.title == newState.title) {
    return { didChange: false, message: '' };
  }
  return { didChange: true, message: '🔄 PR title has been updated', extraInfo: `Old title: ${oldState.title}` };
};

const diffIsApproved = (oldState: PullRequestSummary, newState: PullRequestSummary): DiffResult => {
  if (oldState.isApproved == newState.isApproved) {
    return { didChange: false, message: '' };
  }
  const message = newState.isApproved ? '✅ PR has been approved' : '❌ PR approval removed';
  return { didChange: true, message: message, extraInfo: `Approved by ${newState.approvedBy.map((login) => `@${login}`).join(', ')}` };
};

const diffMerged = (oldState: PullRequestSummary, newState: PullRequestSummary): DiffResult => {
  if (oldState.mergedAt == newState.mergedAt) {
    return { didChange: false, message: '' };
  }
  if (oldState.isClosed == false && newState.isClosed == true) {
    if (newState.mergedBy) {
      return { didChange: true, message: '🥳 PR has been merged', extraInfo: `Merged by @${newState.mergedBy.login}` };
    }
    return { didChange: true, message: '🚫 PR has been closed without merging' };
  }
  return { didChange: true, message: '🔄 PR has been reopened' };
};

export { diffPRSummary };
