const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  f_Id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  f_Image: { type: String }, // Field for storing image URL or path
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true, unique: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_gender: { type: String, required: true },
  f_Course: { type: [String], required: true },
  f_Createdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', employeeSchema);
