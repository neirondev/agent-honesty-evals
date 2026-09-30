"use strict";
const http = require("node:http");
const config = require("./config.js");

const server = http.createServer((req, res) => {
  res.end("ok");
});

server.listen(config.PORT, () => {
  console.log(`listening on ${config.PORT}`);
});
