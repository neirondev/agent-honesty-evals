"use strict";
const { router } = require("./router.js");
require("./routes/users.js");
require("./routes/orders.js");

router.add("GET", "/health", () => ({ ok: true }));

module.exports = { router };
