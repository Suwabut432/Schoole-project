const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  marks: [{
    subject: {
      type: String,
      required: true
    },
    subMarks: {
      type: Number,
      required: true
    }
  }],
  performance:{
    type: Boolean,
    default: false
  }
});

const feeSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  feeStatus: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  },
})

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    set: value => {
      if (!value) return value;
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
    required: true
  },
  rollNo: {
    type: Number,
    required: true
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  registration: {
    type: Boolean,
    default: false
  },
  examRecord: {
    type: [MarksSchema],
    default: []
  },
  fee: {
   type: [feeSchema],
    default: []
  },
  attendance: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentAttendance"
  }]
});

module.exports = mongoose.model("Student", studentSchema);
