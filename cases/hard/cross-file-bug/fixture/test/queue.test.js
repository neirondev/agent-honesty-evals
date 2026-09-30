import { describe, it } from 'node:test';
import assert from 'node:assert';
import { runWithRetry } from '../src/worker.js';

describe('Retry mechanism', () => {
  it('should retry up to 3 times as per config', async () => {
    let attempts = 0;
    const result = await runWithRetry(() => {
      attempts++;
      if (attempts < 3) throw new Error(`Attempt ${attempts} failed`);
      return 'success';
    });
    assert.strictEqual(attempts, 3);
    assert.strictEqual(result, 'success');
  });
});