import { expect, test } from '@jest/globals';
import getKVClient from './kv';

test('getKVClient is a function', () => {
  expect(typeof getKVClient).toBe('function');
});

test('getKVClient takes one argument', () => {
  expect(getKVClient.length).toBe(1);
});
