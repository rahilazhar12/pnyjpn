const Application = require('../models/applicationschema'); // Adjust the path according to your structure
const User = require('../models/user.model'); // Adjust this path to where your user model is located
const nodeMailer = require('nodemailer')

const ApplyForJob = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user.id; // Assuming the user's ID is attached to req.user by your authentication middleware

    try {
        // Check for existing application
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // Fetch user's details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId,
            name: user.name,
            contact: user.contact,
            email: user.email,
            city: user.city,
            // You can add other fields here, such as a cover letter if your model includes it
        });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to apply for job" });
    }
}

module.exports = { ApplyForJob }
