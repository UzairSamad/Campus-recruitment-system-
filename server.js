const express = require("express");
const app = express();
const connectDB = require("./config/db");

// connecting mongo here
connectDB();

//setting up enviroment variables
Port = process.env.Port || 5000;

//importing student api
const student = require("./Routes/student");

// Init middleware
app.use(express.json({ extended: false }));

//init rout
app.use("/api/v1/student", student);

app.listen(Port, () => {
  console.log(`app is running on port ${Port}`);
});
