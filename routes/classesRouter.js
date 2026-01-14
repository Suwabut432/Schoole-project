const express = require("express");
const router = express.Router();
const classModel = require("../models/class");
const teacherModel = require("../models/teacher");

router.get("/", async (req, res) => {
  const classes = await classModel.find();

  res.render("classes", { title: "Home Page", classes});
});

router.get("/create", async (req, res) => {
    const teacher = await teacherModel.find({designation: "teacher"});
  res.render("CreateClass", {teacher});
});

router.post("/create", async (req, res) => {
  const { name, section, incharge} = req.body;
  const createClass = await classModel.create({
    name,
    section,
    incharge,
    subjects: [],
    students: []
  })

  res.redirect("/classes");
})

module.exports = router;
