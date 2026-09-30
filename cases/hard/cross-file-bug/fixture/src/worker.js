import { getRetryLimit } from './queue.js';

// BUG: локальная константа retryLimit=1 затеняет config.retryLimit (который 3)
// Воркер сдаётся после первой попытки вместо трёх.
const retryLimit = 1;

export async function runWithRetry(fn) {
  let lastError;
  for (let attempt = 1; attempt <= retryLimit; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}