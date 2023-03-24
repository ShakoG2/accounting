const express = require("express");
const categoryService = require("../service/Category")
const requireAuth = require("./RequireAuth");
const app = express();

app.post("/categories", requireAuth, categoryService.addCategories);
app.put("/categories/:id", requireAuth, categoryService.updateCategory);
app.delete("/categories/:id", requireAuth, categoryService.deActiveCategory);


module.exports = app;