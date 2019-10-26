const mongoose = require("mongoose");
const config = require("config");

const MONGO_URI = process.env.MONGO_URI || config.get("MONGO_URI");

//connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected Succesfully");
  } catch (error) {
    console.log("unable to connect mongo db");
  }
};

module.exports = connectDB;
