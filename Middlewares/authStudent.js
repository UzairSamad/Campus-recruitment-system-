const jwt = require("jsonwebtoken");
const config = require("config");

//importing model
const Student = require("../models/student/Student");

//setting upenviroment variable
const JWT_SECRET = process.env.JWT_SETRET || config.get("JWT_SECRET");

module.exports = async (req, res, next) => {
  //get token from header and check
  const token = req.header("student-token");

  //if user had not token
  if (!token) {
    res.status(400).json({
      succes: false,
      message: "No token , Authorization Denied"
    });
  }

  try {
    //verify token
    const decoded = await jwt.verify(token, JWT_SECRET);

    //check if student exists in db
    const studentExists = await Student.findById(decoded.student.id);
    console.log(studentExists);

    if (!studentExists) {
      return res.status(400).json({
        succes: false,
        message: "Token is not valid"
      });
    }

    //set decoded object in req

    req.student = decoded.student;

    next();
  } catch (error) {
    return res.status(400).json({
      succes: false,
      message: "Internal Server Error at auth",
      error: error.message
    });
  }
};
