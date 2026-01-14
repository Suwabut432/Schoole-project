const express = require("express");
const Student = require("../models/student");
const Subject = require("../models/subject");
const teacherAttendance = require("../models/teacherAttendence");
const Teacher = require("../models/teacher");
const Class = require("../models/class");


exports.AttendanceForm = async (req, res) => {
    const teachers = await Teacher.find();
    const classes = await Class.find();
    res.render("teacherAttendence", { teachers, classes });
}

exports.SavedAttendence = async (req, res) => {
    const { subjectId, attendance } = req.body;

    const today = new Date();

    for (let item of attendance) {

        const alreadyMarked = await teacherAttendance.findOne({
            teacher: item.teacherId,
            date: today
        });
        const teachere = await Teacher.findOne({ _id: item.teacherId })
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
}