import { githubUserNameMap } from '@/constants';

const getFullName = (githubUser: string) => {
  if (!githubUserNameMap[githubUser]) {
    return githubUser;
  }
  return githubUserNameMap[githubUser];
};

export { getFullName };
