const mongoose = require('mongoose')

const Usermodal = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    contact: { type: String },
    city: { type: String },
    role: { type: String, default: "User" },


});
module.exports = mongoose.model("users", Usermodal);
