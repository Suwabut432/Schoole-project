const express = require("express");
const router = express.Router();
const teacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
const authController = require("../controllers/registerTeacherController");
const Teacher = require("../models/teacher");
const Class = require("../models/class");
const teacherAttendance = require("../models/teacherAttendence");
const teacher = require("../models/teacher");
const Student = require("../models/student");

router.get("/", async (req, res) => {
    res.render("studentForm");
})
router.post("/create", async (req, res) => {
    const { name,
        rollNo,
        className,
        address,
        contect,
        age,
        registration,
        performas, } = req.body;
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
            contect,
            age,
            registration,
            performas
        })
        res.send(student);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.get("/studentAttendence", async (req, res) => {
    const classes = await Class.find();
    const students = await Student.find();
    res.render("studentAttendence", { classes, students });
})



module.exports = router;