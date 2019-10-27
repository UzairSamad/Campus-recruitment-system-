const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

//imorting model and authstudent middleware
const StudentInfo = require("../models/student/StudentInfo");
const authstudent = require("../Middlewares/authStudent");

//validate api params

const postApiParams = Joi.object({
  education: Joi.string().required(),
  specialization: Joi.string().required(),
  semester: Joi.string().required(),
  address: Joi.string().required(),
  contact: Joi.string()
    .required()
    .min(11),
  skills: Joi.string().required()
});

//@post api
router.post("/details", authstudent, async (req, res) => {
  //destructure body
  const {
    education,
    specialization,
    semester,
    address,
    contact,
    skills
  } = req.body;

  //validate
  const { error } = postApiParams.validate({
    education,
    specialization,
    semester,
    contact,
    address,
    skills
  });

  if (error) {
    res.status(400).json({
      succes: false,
      message: error.details[0].message
    });
  }
  try {
    //create user details

    let detail = new StudentInfo({
      education,
      specialization,
      semester,
      skills,
      contact,
      address,
      createdBy: req.student.id
    });

    //save details to db
    await detail.save();

    //populate created detail

    detail = await detail.populate("createdBy", { password: 0 }).execPopulate();

    return res.json({
      succes: true,
      message: "Details Saved Succesfully"
    });
  } catch (error) {
    return res.json({
      succes: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// get-student data
router.get("/get-details", authstudent, async (req, res) => {
  try {
    const detail = await StudentInfo.find({
      createdBy: { $in: req.student.id }
    }).populate("createdBy", { password: 0 });

    return res.json({
      success: true,
      detail
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
