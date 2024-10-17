const mongoose = require('mongoose')

const Companymodal = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    ntnnumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    personincontact: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },

    website: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "company"
    },
    

    // Add approval status, default is false
    isApproved: { type: Boolean, default: false },
    // Password field, initially empty
    password: { type: String, default: "" }

});
module.exports = mongoose.model("Companies", Companymodal);
