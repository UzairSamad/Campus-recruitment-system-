const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const config = require("config");
const jwt = require("jsonwebtoken");

//setting up env variable
const JWT_SECRET = process.env.JWT_SETRET || config.get("JWT_SECRET");

//importing model from db
const company = require("../models/company/Company");

//validating api parameters c

const validateApiParam = Joi.object({
  name: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
});

router.post("/register", async (req, res) => {
  let {
    name,
    password,
    location,
    description,
    number,
    email,
    category
  } = req.body;
  console.log(req.body);
  try {
    const { error } = validateApiParam.validate({ name, password });
    if (error) {
      return res.status(400).json({
        succes: false,
        message: error.details[0].message
      });
    }

    // check company name before creating a new company in db

    let user = await company.findOne({ name });
    console.log(user);
    if (user) {
      return res.status(400).json({
        succes: false,
        message: "CompanyName already exists"
      });
    }

    //create a new user

    newUser = await new company({
      name,
      password,
      description,
      location,
      category,
      number,
      email,
      isActive: true
    });

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //replacing user password with hash
    newUser.password = hash;

    //saving user in db
    await newUser.save();

    // create jwt token
    const payload = {
      name,
      id: newUser._id
    };

    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30d"
    });

    return res.status(200).json({
      succes: true,
      name: newUser.name,
      token
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      error: error.message,
      message: "internal server error"
    });
  }
});

// @post company login api
router.post("/login", async (req, res) => {
  let { name, password } = req.body;
  name = name.toLowerCase();

  try {
    // find company

    const Company = await company.findOne({ name });

    if (!Company) {
      return res.status(400).json({
        succes: false,
        message: "Invalid Name"
      });
    }

    // compare password

    const isMatch = await bcrypt.compare(password, Company.password);
    if (!isMatch) {
      return res.status(400).json({
        succes: false,
        message: "Incorrect Password"
      });
    }

    //create json web token

    const payload = {
      Company: {
        name: Company.name,
        id: Company._id
      }
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30d"
    });

    return res.status(200).json({
      succes: true,
      name: Company.name,
      token,
      description: Company.description,
      message: "Login Succesfully "
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

module.exports = router;
