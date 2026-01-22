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
        if (!classe) return res.send("Class Not Exist in this School.");
        const existStudent = await Student.findOne({ className: classe._id, rollNo });
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
        const updateClass = classe.students.push(student._id)
        classe.save();
        res.redirect("/student/studentsDetail/" + student.className)
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.AttendencePage = async (req, res) => {
    const classes = await Class.findById(req.params.classId);
    const students = await Student.find({ className: req.params.classId }).sort({ rollNo: 1 });
    res.render("studentAttendence", { classes, students });
}
exports.markAttendance = async (req, res) => {
    try {
        const { className, attendance } = req.body;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const year = today.getFullYear();
        const month = today.getMonth();
        const date  = today.getDate();
        let record = await studentAttendence.findOne({ className });

        if (!record) {
            record = await studentAttendence.create({
                className,
                years: []
            });
        }

        let yearObj = record.years.find(y => y.year === year);

        if (!yearObj) {
            record.years.push({ year, months: [] });
            yearObj = record.years.find(y => y.year === year);
        }

        let monthObj = yearObj.months.find(m => m.month === month);

        if (!monthObj) {
            yearObj.months.push({ month, days: [] });
            monthObj = yearObj.months.find(m => m.month === month);
        }

        let alreadyCount = 0;
        for (const item of attendance) {
            
            const student = await Student.findOne({
                _id: item.studentId,
                className
            });

            if (!student) continue;

            const alreadyMarked = monthObj.days.find(d =>
                d.studentName.toString() === item.studentId &&
                d.date.toDateString() === today.toDateString()
            );

            if (alreadyMarked) {
                alreadyCount++;
                continue;
            }

            monthObj.days.push({
                studentName: item.studentId,
                date: today,
                status: item.status
            });

            if (!student.attendance.includes(record._id)) {
                student.attendance.push(record._id);
                await student.save();
            }
        }

        await record.save();

        if (alreadyCount > 0) {
            return res.send("Some students were already marked, rest saved successfully");
        }

        res.send("Attendance saved successfully");

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
};
exports.attendenceDetailPage = async (req, res) => {
    const classe = await Class.findById(req.params.classId).populate({
        path: "students",
        options: { sort: { rollNo: 1 } },
        papulate: {
            path: "attendence",
            model: "studentAttendence",
        }
    });
    const attendence = await studentAttendence.findOne({ className: req.params.classId }).populate("className").populate({
        path: "years.months.days.studentName",
        model: "Student",
    })

    // console.log(classe.students);
    res.render("classAttendenceDetail", { classe, attendence});
}
exports.studentsDetailPage = async (req, res) => {
    const students = await Student.find({ className: req.params.classId }).sort({ rollNo: 1 });
    const classes = await Class.findById(req.params.classId);
    res.render("studentsDetail", { students, classes })
}

