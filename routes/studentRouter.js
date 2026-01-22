const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");
const Class = require("../models/class");
const teacherAttendance = require("../models/teacherAttendence");
const studentAttendance = require("../models/studentAttendance");
const Student = require("../models/student");
const studentController = require("../controllers/studentController");
const { route } = require("./homeRouter");

router.get("/createStudent", studentController.CreateStudentPage)
router.post("/create", studentController.CreateStudent)
router.get("/attendence/:classId", studentController.AttendencePage);
router.post("/attendence", studentController.markAttendance);
router.get("/attendanceDetail/:classId", studentController.attendenceDetailPage)
router.get("/studentsDetail/:classId", studentController.studentsDetailPage)



module.exports = router;