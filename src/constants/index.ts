// All string constants should be defined here //
const CONTENT_TYPE_JSON = 'application/json';
const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_AUTHORIZATION = 'Authorization';
const HEADER_USER_AGENT = 'User-Agent';
const APP_USER_AGENT = 'Cloudflare Worker - Github Alert Bot';
const HTTP_METHOD_POST = 'POST';

/* Constants for string */
const STRING_EMPTY = '';
const STRING_TRUE = 'true';
const STRING_APPROVED = 'APPROVED';

/* Constants for config */
const SEED_STATE_LOCK_KEY = 'SEED_STATE_LOCK';
const SEED_STATE_KEY_PREFIX = 'SEED_STATE_';
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_SEARCH_FILTERS = 'is:open+type:pr+archived:false+user:cdapio+user:data-integrations';

const APP_VERSION = 'v0.1.1';

enum trackedGithubUserName {
  PUSHPENDER_SAINI = 'psainics',
  ANKIT_YADAV = 'AnkitCLI',
  POOJAN_TRIVEDI = 'poojantcs',
  VIKAS_RATHEE = 'vikasrathee-cs',
  ANIL_MAHAJAN = 'anilm67',
  PRINCE_DATTA = 'prince-cs',
  KRISH = 'Krish-cloudsufi',
  ABHISHEK_KUMAR = 'AbhishekKumar9984',
  SANCHIT_GARG = 'sgarg-CS'
}
const githubUserNameMap = {
  psainics: 'Pushpender Saini',
  AnkitCLI: 'Ankit Yadav',
  poojantcs: 'Poojan Trivedi',
  'vikasrathee-cs': 'Vikas Rathee',
  'itsankit-google': 'Ankit Jain',
  anilm67: 'Anil Mahajan',
  'prince-cs': 'Prince Datta',
  'Krish-cloudsufi': 'Krish',
  AbhishekKumar9984: 'Abhishek Kumar',
  'sgarg-CS': 'Sanchit Garg',
} as GithubUserNameMap;

const TRACKED_USERS_ARRAY: trackedGithubUserName[] = [
  trackedGithubUserName.PUSHPENDER_SAINI,
  trackedGithubUserName.ANKIT_YADAV,
  trackedGithubUserName.POOJAN_TRIVEDI,
  trackedGithubUserName.VIKAS_RATHEE,
  trackedGithubUserName.ANIL_MAHAJAN,
  trackedGithubUserName.PRINCE_DATTA,
  trackedGithubUserName.KRISH,
  trackedGithubUserName.ABHISHEK_KUMAR,
];

export {
  CONTENT_TYPE_JSON,
  HEADER_CONTENT_TYPE,
  SEED_STATE_KEY_PREFIX,
  HTTP_METHOD_POST,
  STRING_EMPTY,
  STRING_APPROVED,
  SEED_STATE_LOCK_KEY,
  STRING_TRUE,
  HEADER_AUTHORIZATION,
  HEADER_USER_AGENT,
  APP_USER_AGENT,
  GITHUB_SEARCH_FILTERS,
  TRACKED_USERS_ARRAY,
  GITHUB_GRAPHQL_ENDPOINT,
  trackedGithubUserName,
  githubUserNameMap,
  APP_VERSION,
};
