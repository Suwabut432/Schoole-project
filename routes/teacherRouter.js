const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");7
const authController = require("../controllers/registerTeacherController");
router.get("/register", authController.registerPage);
router.get("/login", authController.loginPage)
router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/logout", authController.logout);
router.get("/attendence", teacherController.AttendanceForm);
router.post("/attendance", teacherController.SavedAttendence);

module.exports = router;