const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    contact: { type: String },
    city: { type: String },
    role: { type: String, default: "User" },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false }
}, { 
    timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model("users", UserSchema);
