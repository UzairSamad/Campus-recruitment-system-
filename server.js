const express = require("express");
const app = express();

Port = process.env.Port || 5000;

app.listen(Port, () => {
  console.log(`app is running on port ${Port}`);
});
