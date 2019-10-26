const express = require("express");
const app = express();
const connectDB = require("./config/db");

// connecting mongo here
connectDB();

//setting up enviroment variables
Port = process.env.Port || 5000;

app.listen(Port, () => {
  console.log(`app is running on port ${Port}`);
});
