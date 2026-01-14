const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
const authController = require("../controllers/registerTeacherController");
const Teacher = require("../models/teacher");
const Class = require("../models/class");
const teacherAttendance = require("../models/teacherAttendence");
const teacher = require("../models/teacher");

router.get("/register", async (req, res) => {
  const classes = await Class.find();
  console.log(classes);
  res.render("register", { title: "Home Page", classes });
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/register", authController.register)



router.post("/login", authController.login)

router.get("/logout", authController.logout);

router.get("/attendence", async (req, res) => {
  const teachers = await Teacher.find();
  const classes = await Class.find();
  res.render("teacherAttendence", { teachers, classes });
});

router.post("/attendance", async (req, res) => {
  const { subjectId, attendance } = req.body;

  const today = new Date();

  for (let item of attendance) {

    const alreadyMarked = await teacherAttendance.findOne({
      teacher: item.teacherId,
      date: today
    });
     const teachere = await Teacher.findOne({_id: item.teacherId})
    if (!alreadyMarked) {
      await teacherAttendance.create({
        teacher: item.teacherId,
        name: teachere.name,
        date: today,
        status: item.status
      });
    }
  }

  res.send("Attendance Saved Successfully");
});

module.exports = router;