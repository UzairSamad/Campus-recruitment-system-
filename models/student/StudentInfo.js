const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      type: String,
      required: true
    },
    contact: {
      type: String,
      reequired: true
    },
    skills: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("StudentInfo", studentInfoSchema);
