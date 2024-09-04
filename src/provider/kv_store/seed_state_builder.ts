import { SEED_STATE_LOCK_KEY, STRING_TRUE, TRACKED_USERS_ARRAY, SEED_STATE_KEY_PREFIX } from '@/constants';

const generateSeedState = async (kvClient: KVNamespace, githubClient: GithubClient): Promise<boolean> => {
  const isSeedStatePresent = await kvClient.get(SEED_STATE_LOCK_KEY);
  if (!isSeedStatePresent) {
    await kvClient.put(SEED_STATE_LOCK_KEY, STRING_TRUE);
    /* build seed state */
    for (const trackingUser of TRACKED_USERS_ARRAY) {
      // get all open PRs
      const openPRs = await githubClient.getAllOpenPRs(trackingUser);
      // save to KV store
      await kvClient.put(SEED_STATE_KEY_PREFIX + trackingUser, JSON.stringify(openPRs));
    }
    return true;
  }
  return false;
};

export default generateSeedState;
