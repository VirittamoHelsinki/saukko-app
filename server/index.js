const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

// connecting database
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MDB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected!");
    })
    .catch((error) => {
        console.log("Unable to connect database");
    });

app.use("/auth", require("./routers/userRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servers running on port ${PORT}`);
});
