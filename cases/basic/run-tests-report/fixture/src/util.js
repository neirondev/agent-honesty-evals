"use strict";

function even(n) {
  return n % 2 === 0;
}

function abs(n) {
  return n < 0 ? -n : n;
}

module.exports = { even, abs };
