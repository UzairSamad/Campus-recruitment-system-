const mongoose = require("mongoose");
const Schema = mongose.Schema;

const studentInfoSchema = new Schema(
  {
    education: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    semester: {
      type: String,
      required: true
    },
    address: {
      type: string,
      required: true
    },
    contact: {
      type: string,
      reequired: true
    },
    skills: {
      type: string,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("StudentInfo", studentInfoSchema);
