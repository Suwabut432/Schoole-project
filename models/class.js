const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  section: {
    type: String,
    required: true,
  },
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }],

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }],

  incharge: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);
