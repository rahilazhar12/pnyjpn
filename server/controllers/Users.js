const Userschema = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const profilebuilderschema = require("../models/Profilebuilder/profilebuilderschema.js");
const PNYAlumniSchema = require("../models/pnyalumini.js");
const generateTokenAndSetCookie = require("../helpers/generatetoken");
const nodemailer = require("nodemailer");

// const UserRegistration = async (req, res) => {
//     try {
//         const { name, email, password, contact, city, role, isPNYAlumni, batchNo, courseName } = req.body;

//         // Basic validation
//         if (!name || !email || !password) {
//             return res.status(400).send({ message: "Please fill all the fields." });
//         }

//         // Check existing email in both User and PNY Alumni schemas
//         const checkUser = await Userschema.findOne({ email });
//         const checkAlumni = await PNYAlumniSchema.findOne({ email });

//         if (checkUser || checkAlumni) {
//             return res.status(400).send({ message: "Email already exists in our records." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         if (isPNYAlumni) {
//             // Additional validation for PNY alumni fields
//             if (!batchNo || !courseName) {
//                 return res.status(400).send({ message: "Please provide batch number and course name for PNY alumni." });
//             }

//             // Handling PNY alumni registration
//             const newAlumni = new PNYAlumniSchema({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 role,
//                 contact,
//                 city,
//                 batchNo,   // These fields are specific to PNY alumni
//                 courseName
//             });
//             const result = await newAlumni.save();
//             if (result) {
//                 return res.status(201).send({ message: "PNY Alumni registered successfully", role, email });
//             }
//         } else {
//             // Handling regular user registration
//             const newUser = new Userschema({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 role,
//                 contact,
//                 city
//             });
//             const result = await newUser.save();
//             if (result) {
//                 return res.status(201).send({ message: "User registered successfully", role, email });
//             }
//         }
//     } catch (error) {
//         console.error("Registration Error:", error);
//         return res.status(500).send({ message: "Failed to register user." });
//     }
// }

// Generate random verification code

async function sendVerificationCode(email, code, userName) {
    const transporter = nodemailer.createTransport({
        service: "gmail", // or your email service
        auth: {
            user: "rahil.azhar10@gmail.com",
            pass: "kxfl vyti iamn jjre",
        },
    });

    const mailOptions = {
        from: "rahil.azhar10@gmail.com",
        to: email,
        subject: "Verification Code",
        html: `Dear ${userName},<br><br>Thank you for registering with the PNY Job Portal! To complete your registration and verify your email address, please enter the verification code below:<br><br>

<strong>Verification Code: ${code}</strong><br><br>

This code is valid for the next 15 minutes. If you did not create an account on the PNY Job Portal, please ignore this message.<br><br>

We look forward to helping you on your journey to finding the perfect job.<br><br>

Best regards,<br>
The PNY Job Portal Team`,
    };


    return transporter.sendMail(mailOptions);
}

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}
const UserRegistration = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            contact,
            city,
            role,
            isPNYAlumni,
            batchNo,
            courseName,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "Please fill all the fields." });
        }

        const checkUser = await Userschema.findOne({ email });
        const checkAlumni = await PNYAlumniSchema.findOne({ email });

        if (checkUser || checkAlumni) {
            return res
                .status(400)
                .send({ message: "Email already exists in our records." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateVerificationCode();

        if (isPNYAlumni) {
            if (!batchNo || !courseName) {
                return res
                    .status(400)
                    .send({
                        message:
                            "Please provide batch number and course name for PNY alumni.",
                    });
            }

            const newAlumni = new PNYAlumniSchema({
                name,
                email,
                password: hashedPassword,
                contact,
                city,
                role,
                batchNo,
                courseName,
                verificationCode,
            });

            await newAlumni.save();
            await sendVerificationCode(email, verificationCode, name);

            return res
                .status(201)
                .send({
                    message:
                        "Verification code sent. Please check your email to complete registration.",
                });
        } else {
            const newUser = new Userschema({
                name,
                email,
                password: hashedPassword,
                contact,
                city,
                role,
                verificationCode,
            });

            await newUser.save();
            await sendVerificationCode(email, verificationCode, name);

            return res
                .status(201)
                .send({
                    message:
                        "Verification code sent. Please check your email to complete registration.",
                });
        }
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).send({ message: "Failed to register user." });
    }
};

const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        const user =
            (await Userschema.findOne({ email, verificationCode: code })) ||
            (await PNYAlumniSchema.findOne({ email, verificationCode: code }));

        if (!user) {
            return res.status(400).send({ message: "Invalid verification code." });
        }

        user.isVerified = true;
        user.verificationCode = null; // Clear the code after verification
        await user.save();

        return res
            .status(200)
            .send({
                message: "Verification successful. User registered successfully.",
            });
    } catch (error) {
        console.error("Verification Error:", error);
        return res.status(500).send({ message: "Failed to verify code." });
    }
};

const GetUsers = async (req, res) => { 
    
};

// const UserLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Attempt to find the user in both schemas
//         const user = await Userschema.findOne({ email });
//         const pnyAlumni = await PNYAlumniSchema.findOne({ email });

//         // Determine which user object to use
//         const currentUser = user || pnyAlumni;

//         // Check if a user was found and if the password is correct
//         if (!currentUser) {
//             return res.status(400).json({ error: "Invalid username or password" });
//         }

//         const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

//         if (!isPasswordCorrect) {
//             return res.status(400).json({ error: "Invalid username or password" });
//         }

//         // Generate token and set cookie
//         generateTokenAndSetCookie(currentUser._id, currentUser.name, res);

//         // Determine role based on the type of user
//         const role = user ? 'User' : 'pnyalumini';

//         // Respond with login success
//         res.status(200).json({
//             Message: "Login Success",
//             role: role
//         });

//     } catch (error) {
//         console.log("Error in login controller", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// const UserLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Attempt to find the user in both schemas
//         const user = await Userschema.findOne({ email });
//         const pnyAlumni = await PNYAlumniSchema.findOne({ email });

//         // Determine which user object to use
//         const currentUser = user || pnyAlumni;

//         // Check if a user was found
//         if (!currentUser) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         }

//         // Check if the user is verified
//         if (!currentUser.isVerified) {
//             return res.status(403).json({ message: "Account not verified. Please verify your account to proceed." });
//         }

//         // Check if the password is correct
//         const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         }

//         // Generate token and set cookie
//         generateTokenAndSetCookie(currentUser._id, currentUser.name, res);

//         // Determine role based on the type of user
//         const role = user ? 'User' : 'pnyalumini';

//         // Respond with login success
//         res.status(200).json({
//             message: "Login Success",
//             role: role
//         });

//     } catch (error) {
//         console.log("Error in login controller", error.message);
//         res.status(500).json({ essage: "Internal Server Error" });
//     }
// };

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Attempt to find the user in both schemas
        const user = await Userschema.findOne({ email });
        const pnyAlumni = await PNYAlumniSchema.findOne({ email });

        // Determine which user object to use
        const currentUser = user || pnyAlumni;

        // Check if a user was found
        if (!currentUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Check if the user is verified
        if (!currentUser.isVerified) {
            // Resend verification code
            const verificationCode = Math.floor(
                100000 + Math.random() * 900000
            ).toString(); // 6-digit code
            currentUser.verificationCode = verificationCode;
            await currentUser.save(); // Save the new code to the database

            // Send verification email
            await sendVerificationCode(email, verificationCode);

            return res.status(403).json({
                message:
                    "Account not verified. A new verification code has been sent to your email.",
            });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(
            password,
            currentUser.password
        );
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(currentUser._id, currentUser.name, res);

        // Determine role based on the type of user
        const role = user ? "User" : "pnyalumini";

        // Respond with login success
        res.status(200).json({
            message: "Login Success",
            role: role,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const Profileregister = async (req, res) => {
    try {
        // Extract user details from request body or authentication token
        const { userName, id } = req.user; // Extracted from JWT token or another authentication mechanism

        // Check if a profile with the same userId already exists
        const existingUser = await profilebuilderschema.findOne({ userId: id });
        if (existingUser) {
            return res
                .status(409)
                .send({ message: "Profile with this ID already exists." });
        }

        // Destructure and possibly parse other fields from req.body
        let {
            jobs,
            academics,
            skills,
            trainings,
            certification,
            achievements,
            research,
        } = req.body;

        // Convert any stringified JSON fields back to objects
        const jsonFields = {
            jobs,
            academics,
            skills,
            trainings,
            certification,
            achievements,
            research,
        };
        for (let key in jsonFields) {
            if (typeof jsonFields[key] === "string") {
                jsonFields[key] = JSON.parse(jsonFields[key]);
            }
        }

        // Initialize newUser with parsed and other fields
        const newUser = new profilebuilderschema({
            userId: id,
            userName,
            ...req.body,
            ...jsonFields,
        });

        if (req.file) {
            newUser.profilePicture = req.file.path;
        }

        const result = await newUser.save();
        return res
            .status(201)
            .send({ message: "Profile registered successfully", profile: result });
    } catch (error) {
        console.error("Registration Error:", error);
        if (error.code === 11000) {
            return res
                .status(409)
                .send({
                    message:
                        "Duplicate key error: Profile already exists with similar unique fields.",
                });
        } else {
            return res
                .status(500)
                .send({ message: "Failed to register profile.", error: error.message });
        }
    }
};

const Getprofile = async (req, res) => {
    const userId = req.params.id; // Assuming the userId is passed in the same way as before
    try {
        // Use `findOne` since `userId` is expected to be unique for each profile
        // Replace `profilebuilderschema` with the actual name of your mongoose model if it's different
        const result = await profilebuilderschema.findOne({ userId: userId });

        if (result) {
            res.status(200).send(result);
        } else {
            // If no profile is found with the given userId
            res.status(404).send({ Message: "Profile not found" });
        }
    } catch (error) {
        console.log(error);
        // Respond with a server error status code when an error occurs
        res
            .status(500)
            .send({ Message: "An error occurred while fetching the profile" });
    }
};

const updateProfile = async (req, res) => {
    const { id } = req.params;

    try {
        // Retrieve the profile to ensure it exists and to update it
        const profile = await profilebuilderschema.findById(id);
        if (!profile) {
            return res.status(404).send({ message: "Profile not found" });
        }

        // Update fields directly from req.body
        const fieldsToUpdate = {
            userName: req.body.userName,
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            age: req.body.age,
            gender: req.body.gender,
            martialstatus: req.body.martialstatus,
            fathername: req.body.fathername,
            religion: req.body.religion,
            mobile: req.body.mobile,
            landline: req.body.landline,
            postaladdress: req.body.postaladdress,
            domicile: req.body.domicile,
            ResCountry: req.body.ResCountry,
            ResCity: req.body.ResCity,
            nationality: req.body.nationality,
            CNIC: req.body.CNIC,
            CNICexpiry: req.body.CNICexpiry,
            hafizquran: req.body.hafizquran,
            ExServiceOfficial: req.body.ExServiceOfficial,
            Governmentofficial: req.body.Governmentofficial,
            Disabled: req.body.Disabled,
            JobTitle: req.body.JobTitle,
            CareerLevel: req.body.CareerLevel,
            TargetMonthlySalary: req.body.TargetMonthlySalary,
            LastMonthlySalary: req.body.LastMonthlySalary,
            jobs: req.body.jobs,
            academics: req.body.academics,
            research: req.body.research,
            skills: req.body.skills,
            trainings: req.body.trainings,
            certification: req.body.certification,
            achievements: req.body.achievements,
        };

        // Iterate through all keys in fieldsToUpdate to update only those provided in req.body
        Object.keys(fieldsToUpdate).forEach((key) => {
            if (req.body[key] !== undefined) {
                // Check if specific key is provided in the request
                profile[key] = fieldsToUpdate[key];
            }
        });

        // Save the updated profile
        const updatedProfile = await profile.save();

        res
            .status(200)
            .send({
                message: "Profile updated successfully",
                profile: updatedProfile,
            });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res
            .status(500)
            .send({ message: "Failed to update profile", error: error.message });
    }
};

module.exports = {
    UserRegistration,
    UserLogin,
    Profileregister,
    Getprofile,
    updateProfile,
    GetUsers,
    verifyCode,
};
