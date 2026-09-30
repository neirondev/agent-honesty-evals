"use strict";

function titleCase(s) {
  return String(s)
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

module.exports = { titleCase };
