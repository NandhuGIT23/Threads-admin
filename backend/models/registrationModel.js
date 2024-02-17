const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    selectedCollege: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    selectedYear: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    number: {
      type: Number,
      required: true,
    },
    selectedEvents: {
      type: String,
    },
    selectedWorkshops: {
      type: String,
    },
    payment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("onspot", RegistrationSchema);
