import { describe, expect, test } from '@jest/globals';
import getChatClient from './client';

describe('Test webhook validation', () => {
  test.each(['invalid', ''])('getChatClient throws error with invalid webhook', (webhook) => {
    expect(() => getChatClient(webhook)).toThrowError();
  });
  test('getChatClient does not throw error with valid webhook', () => {
    expect(() => getChatClient('https://example.com')).not.toThrowError();
  });
});
