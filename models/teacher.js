const mongoose = require("mongoose");


const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        set: value => {
            if(!value) return value;
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        },
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    designation: String,
    Attendence:{
        type: mongoose.Schema.Types.ObjectId,
        ref: ""
    }
},{timestamps: true})


module.exports = mongoose.model("Teacher", teacherSchema);