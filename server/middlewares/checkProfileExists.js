const Profilebuilder = require('../models/Profilebuilder/profilebuilderschema'); // Adjust the path if needed

const checkProfileExists = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated with user details via authentication middleware

        // Check if the user has a profile
        const profile = await Profilebuilder.findOne({ userId });

        if (!profile) {
            return res.status(400).json({ message: "Please create a profile before applying for jobs." });
        }

        // If profile exists, proceed to the next middleware/controller
        next();
    } catch (error) {
        console.error("Profile check error:", error);
        return res.status(500).json({ message: "Server error while checking profile." });
    }
};

module.exports = checkProfileExists;
