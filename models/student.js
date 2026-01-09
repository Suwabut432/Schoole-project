const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true
  },
  rollNo: {
    type: Number,
    required: true
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contect: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  registration: {
    type: Boolean,
    default: false
  },
  performas: {
    type: String,
    enum: ["E", "G", "B"],
    dafault: "B"
  }
});

module.exports = mongoose.model("Student", studentSchema);
