import { describe, expect, test, jest } from '@jest/globals';
import generateSeedState from '@/provider/kv_store/seed_state_builder';
import { SEED_STATE_LOCK_KEY, STRING_TRUE, TRACKED_USERS_ARRAY } from '@/constants';

describe('Test generateSeedState function', () => {
  test('should return true and set seed state if it is not present', async () => {
    const mockKvClient = { get: jest.fn(), put: jest.fn() };
    const mockGithubClient = { getAllOpenPRs: jest.fn() };
    mockKvClient.get.mockReturnValue(null);
    const result = await generateSeedState(mockKvClient as any, mockGithubClient as any);
    expect(result).toBe(true);
    expect(mockKvClient.put).toHaveBeenCalledWith(SEED_STATE_LOCK_KEY, STRING_TRUE);
    expect(mockKvClient.put).toHaveBeenCalledTimes(TRACKED_USERS_ARRAY.length + 1);
    expect(mockGithubClient.getAllOpenPRs).toHaveBeenCalledTimes(TRACKED_USERS_ARRAY.length);
  });

  test('should return false if seed state is present', async () => {
    const mockKvClient = { get: jest.fn(), put: jest.fn() };
    const mockGithubClient = { getAllOpenPRs: jest.fn() };
    mockKvClient.get.mockReturnValue('true');
    const result = await generateSeedState(mockKvClient as any, mockGithubClient as any);
    expect(result).toBe(false);
    expect(mockKvClient.put).not.toHaveBeenCalled();
    expect(mockGithubClient.getAllOpenPRs).not.toHaveBeenCalled();
  });
});
