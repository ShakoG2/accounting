const express = require("express");
const userModel = require("../model/User");
const app = express();
const requireAuth = require('./RequireAuth');

/**
 * return all users from database schema users
 */

app.get('/users', requireAuth, async (req, res) => {
    try {
        //return userModel.find();
    } catch (err) {
        console.log("error while retrieve all users");
        return res.send("error while retrieve all users");
    }
});

module.exports = app;

