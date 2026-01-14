const express = require("express");

const Student = require("./models/student");
const Subject = require("./models/subject");
const Attendance = require("./models/attendance");




// Attendance Page


// Save Attendance (WITH DUPLICATE CHECK)
app.post("/attendance", async (req, res) => {
  const { subjectId, attendance } = req.body;

  try {

    const today = new Date();

    for (let item of attendance) {

      const alreadyMarked = await Attendance.findOne({
        student: item.studentId,
        date: today
      });

      if (!alreadyMarked) {
        await Attendance.create({
          student: item.studentId,
          subject: subjectId,
          date: today,
          status: item.status
        });
      }
    }

    res.send("Attendance Saved Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
