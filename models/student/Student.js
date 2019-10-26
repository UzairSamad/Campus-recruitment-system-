const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const email = require("mongoose-type-email");

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlegth: 8,
      trim: true
    },
    isActive: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", StudentSchema);
