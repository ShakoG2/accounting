require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const registrationRouter = require("./routes/RegistrationRoute")
const loginRouter = require("./routes/LoginRoute")
const userRoute = require("./routes/UserRoute")
const categoryRoute = require("./routes/CategoryRoute")
const app = express();
app.use(express.json());

app.use(loginRouter);
app.use(registrationRouter)
app.use(userRoute)
app.use(categoryRoute)

const port = process.env.APP_PORT
const databaseUri = process.env.DATABASE_URI

app.listen(port, () => {
    console.log("app is starting on port " + port);
});

mongoose.connect(databaseUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected accounting database successfully");
});