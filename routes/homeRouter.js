const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacher");

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
