const mongoose = require("mongoose");
const teacher = require("./teacher");

const teacherAttendanceSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // class: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Class",
  //   required: true
  // },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    required: true
  }
});

module.exports = mongoose.model("TeacherAttendance", teacherAttendanceSchema);
