const mongoose = require("mongoose");


const daySchema = new mongoose.Schema({
  teacherName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  checkInTime: {
    type: Date,
    required: true
  },
  checkOutTime: {
    type: Date,
    default: null
  }
})

const monthSchema = new mongoose.Schema({
  month: {
    type: Number,
    min: 1,
    max: 12,
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
  years: [yearSchema]
}, { timestamps: true });


module.exports = mongoose.model("TeacherAttendance", attendanceSchema);