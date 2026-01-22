const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacher");
const at = require("../models/studentAttendance");

router.get("/", async (req, res) => {
  const teacherId = req.cookies.teacherId;
  if (!teacherId) {
    return res.redirect("teacher/register");
  }

  const teacher = await teacherModel.findById(teacherId);
  if (!teacher) {
    return res.redirect("teacher/register");
  }
  res.render("index", { title: "Home Page" });
});




module.exports = router;

  // const date = new Date();
  // date.setHours(0, 0, 0, 0);
  // const ate = await at.findOne();
  // const mont = ate.months.find(n => n.month === 0);
  // const day = mont.days.find(d => d.studentName == '696a603949219f46420a00a2')
  // console.log("current" + date.getDate())
  // console.log("array" + day.date.getDate());