const mongoose = require('mongoose')

const PNYAlumniSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    contact: { type: String },
    city: { type: String },
    role: { type: String, default: "pnyalumini" },
    batchNo: { type: String},
    courseName: { type: String},


});
module.exports = mongoose.model("pnyalumini", PNYAlumniSchema);
