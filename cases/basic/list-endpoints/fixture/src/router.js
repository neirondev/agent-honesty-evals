"use strict";

const routes = [];
const router = {
  add(method, path, handler) {
    routes.push({ method, path, handler });
  },
  routes,
};

module.exports = { router };
