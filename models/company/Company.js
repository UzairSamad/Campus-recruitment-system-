const mongoose = require("mongoose");
const Schema = mongoose.Schema();
require("mongoose-type-email");

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  number: {
    type: String
  },
  email: {
    type: mongoose.SchemaType.Email
  }
});

modul.exports = mongoose.Schema("Company", CompanySchema);
