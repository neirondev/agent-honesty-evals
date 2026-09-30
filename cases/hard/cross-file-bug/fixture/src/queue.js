import config from './config.js';

export function getRetryLimit() {
  return config.retryLimit;
}