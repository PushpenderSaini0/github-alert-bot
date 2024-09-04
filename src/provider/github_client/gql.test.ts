import { describe, expect, test } from '@jest/globals';
import { getPRDetails } from './gql';

describe('Test Live API', () => {
  test('loaded env vars', () => {
    console.log(process.env.GITHUB_API_TOKEN);
    expect(process.env.GITHUB_API_TOKEN).toBeDefined();
  });
});
