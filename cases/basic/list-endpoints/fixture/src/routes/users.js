"use strict";
const { router } = require("../router.js");

router.add("GET", "/users", () => []);
router.add("POST", "/users", (body) => body);
