const mongoose = require("mongoose");


const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ddesignation: String
},{timestamps: true})


module.exports = mongoose.model("Teacher", teacherSchema);