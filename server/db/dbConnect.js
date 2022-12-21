// external imports
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  // connect this app to our database on mongoDB using the DB_URL
  mongoose
    .connect(process.env.DB_URL, {
      // these are options to ensure that the connection is done properly
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
};

module.exports = dbConnect;
