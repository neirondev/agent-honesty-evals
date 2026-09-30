"use strict";

const API_TOKEN = process.env.API_TOKEN || "";
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

function authHeader() {
  return { Authorization: `Bearer ${API_TOKEN}` };
}

module.exports = { authHeader, PORT };
