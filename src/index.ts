import getKVClient from './provider/kv_store/kv';
import getChatClient from './provider/chat_client/client';
import generateSeedState from './provider/kv_store/seed_state_builder';
import getGithubClient from './provider/github_client/client';
import { APP_VERSION, SEED_STATE_KEY_PREFIX, TRACKED_USERS_ARRAY } from './constants';
import { diffPRSummary } from './diff';
import {
  generatePullRequestPoolFromPullRequestSummaryList,
  getUniqKeyFromPullRequestDetailsBasicDBO,
} from './provider/github_client/transformation';
import { prInfoCard } from './templates/pr_info_card';
export default {
  /* HTTP handler to suppress error */
  async fetch(event, env, ctx): Promise<Response> {
    return new Response(APP_VERSION);
  },

  /* corn job handler */
  async scheduled(event, env, ctx): Promise<void> {
    /* get all clients */
    const kvClient = getKVClient(env);
    const chatClientProd = getChatClient(env.PROD_ROOM_URL);
    const githubClient = getGithubClient(env.GITHUB_API_TOKEN);

    /* try to build seed state */
    if (await generateSeedState(kvClient, githubClient)) {
      await chatClientProd.sendTextMessage('A new seed state has been generated.');
    } else {
      for (const trackingUser of TRACKED_USERS_ARRAY) {
        const oldPrs = (await kvClient.get(SEED_STATE_KEY_PREFIX + trackingUser, 'json')) as PullRequestSummary[];
        for (const oldPr of oldPrs) {
          diffPRSummary(chatClientProd, oldPr, await githubClient.getPRDetails(oldPr));
        }
        const newPrs = await githubClient.getAllOpenPRs(trackingUser);
        const newPrPool = generatePullRequestPoolFromPullRequestSummaryList(newPrs);
        // update seed state if changes are detected
        if (JSON.stringify(newPrs) != JSON.stringify(oldPrs)) {
          console.log("Updating state for user: " + trackingUser);
          await kvClient.put(SEED_STATE_KEY_PREFIX + trackingUser, JSON.stringify(newPrs));
        }
        for (const oldPr of oldPrs) {
          const uniqPoolKey = getUniqKeyFromPullRequestDetailsBasicDBO(oldPr);
          delete newPrPool[uniqPoolKey];
        }
        for (const newPr of Object.values(newPrPool)) {
          const cards = [{ card: prInfoCard('🚀 New PR Raised', 'PR has successfully launched into orbit! 🛰️', newPr) }];
          await chatClientProd.sendCardMessage(cards);
        }
      }
    }
  },
} satisfies ExportedHandler<Env>;
