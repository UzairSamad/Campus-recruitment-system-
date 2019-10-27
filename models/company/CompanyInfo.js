const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanyInfoSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timesstamps: true
  }
);

module.exports = mongoose.model("CompanyInfo", CompanyInfoSchema);
