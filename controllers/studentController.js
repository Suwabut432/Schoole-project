const express = require("express");
const router = express.Router();
const Class = require("../models/class");
const teacher = require("../models/teacher");
const Student = require("../models/student");
const studentAttendence = require("../models/studentAttendance");

exports.CreateStudentPage = async (req, res) => {
    res.render("studentForm");
}

exports.CreateStudent = async (req, res) => {
    const { name,
        rollNo,
        className,
        address,
        contact,
        age,
        registration,
        performance, } = req.body;
    try {
        const classe = await Class.findOne({ name: className });
        console.log(classe);
        if (!classe) return res.send("Class Not Exist in this School.");
        const existStudent = await Student.findOne({ rollNo });
        if (existStudent) return res.send("This RollNo Student Already Exist");
        const student = await Student.create({
            name,
            rollNo,
            className: classe._id,
            address,
            contact,
            age,
            registration,
            performance
        })
        res.send(student);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


exports.AttendencePage = async (req, res) => {
    const classes = await Class.find();
    const students = await Student.find();
    res.render("studentAttendence", { classes, students });
}

exports.SavedAttendence = async (req, res) => {
    const attendance = req.body.attendance;

    if (!attendance) {
        return res.send("No attendance data");
    }
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        for (item of attendance) {
            const alreadyMarked = await studentAttendence.findOne({
                student: item.studentId,
                date: {$gte: start, $lte: end}
            })

            const student = await Student.findById(item.studentId);
            if (!alreadyMarked) {
                const createAttendence = await studentAttendence.create({
                    student: student._id,
                    class: student.className,
                    date: new Date(),
                    status: item.status
                })
                await Student.updateOne(
                    { _id: student._id },
                    { $push: { attendance: createAttendence._id } }
                );
            }
        }
        res.send("Attendence Saved Successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
}