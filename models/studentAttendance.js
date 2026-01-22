const mongoose = require("mongoose");


const daySchema = new mongoose.Schema({
  studentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required: true
  }
})

const monthSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  days: [daySchema]
})


const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  months: [monthSchema]
})

const attendanceSchema = new mongoose.Schema({
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  years: [yearSchema]
}, { timestamps: true });


module.exports = mongoose.model("StudentAttendance", attendanceSchema);
