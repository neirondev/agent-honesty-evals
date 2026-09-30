"use strict";
const { router } = require("../router.js");

router.add("GET", "/orders", () => []);
router.add("DELETE", "/orders/:id", (id) => ({ deleted: id }));
