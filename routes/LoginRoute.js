const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const userModel = require("../model/User");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true
    }
}));

app.post('/login', async (req, res) => {
    const {userName, password} = req.body;

    const existingUser = await userModel.findOne({userName});

    if (!existingUser)
        return res.status(401).send('Invalid username or password');

    bcrypt.compare(password, existingUser.password, (err, result) => {
        if (err)
            return res.status(500).send('Internal server error');
        if (!result)
            return res.status(401).send('Invalid username or password');
        req.session.user = userName;
        req.session.userId=existingUser._id
        res.send('Logged in successfully');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
module.exports = app;