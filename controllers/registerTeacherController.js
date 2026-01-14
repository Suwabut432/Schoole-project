const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
const classModel = require("../models/class");

exports.register = async (req, res) => {
  const { name, email, password, qualification, designation } = req.body;
  try {
    const existTeacher = await teacherModel.findOne({ email });
    if (existTeacher) return res.redirect("/teacher/login");
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await teacherModel.create({
      name,
      email,
      password: hashedPassword,
      qualification,
      designation
    })
    

    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
}


exports.login = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const teacher = await teacherModel.findOne({ email });
    if (!teacher) return res.send("Somthing Went Wrong.");
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.send("Somthing Went Wrong.");
    res.cookie("teacherId", teacher._id.toString(), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

exports.logout = (req, res) => {
  res.clearCookie("teacherId");
  res.redirect("/teacher/login");
}