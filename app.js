const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();


app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const indexRouter = require("./routes/homeRouter");
const teacherRouter = require("./routes/teacherRouter");
const classRouter = require("./routes/classesRouter");
const studentRouter = require("./routes/studentRouter");
app.use("/", indexRouter);
app.use("/teacher", teacherRouter);
app.use("/classes", classRouter);
app.use("/student", studentRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});