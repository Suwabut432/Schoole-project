const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");
const Class = require("../models/class");
const teacherAttendance = require("../models/teacherAttendence");
const Student = require("../models/student");
const studentController = require("../controllers/studentController");

router.get("/createStudent", studentController.CreateStudentPage)
router.post("/create", studentController.CreateStudent)
router.get("/attendence", studentController.AttendencePage);
router.post("/attendence", studentController.SavedAttendence);

module.exports = router;