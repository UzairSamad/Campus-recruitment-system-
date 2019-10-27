const express = require("express");
const app = express();
const connectDB = require("./config/db");

// connecting mongo here
connectDB();

//setting up enviroment variables
Port = process.env.Port || 5000;

//importing student api
const student = require("./Routes/student");
const company = require("./Routes/company");
const studentInfo = require("./Routes/studentInfo");

// Init middleware
app.use(express.json({ extended: false }));

//init register routes
app.use("/api/v1/student", student);
app.use("/api/v1/company", company);

//init detail routes for student and company info
app.use("/api/v1/studentInfo", studentInfo);

app.listen(Port, () => {
  console.log(`app is running on port ${Port}`);
});
