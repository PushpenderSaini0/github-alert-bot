const getKVClient = (env: Env) => {
  return env.GITHUB_ALERT_BOT_KV;
};

export default getKVClient;
