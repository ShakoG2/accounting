const express = require("express");
const entryService = require("../service/Entry")
const requireAuth = require("./RequireAuth");
const app = express();
/**
 * make accounting entry
 */
app.post("/entries", requireAuth, entryService.makeEntry);

/**
 * make accounting entry with params
 */
app.get("/entries", requireAuth, entryService.getEntries);