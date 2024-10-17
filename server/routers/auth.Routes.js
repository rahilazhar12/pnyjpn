// import mongoose from "mongoose";
const express = require('express')
const { UserRegistration, UserLogin, Profileregister, Getprofile, updateProfile, GetUsers } = require('../controllers/Users')
const { ApplyForJob } = require('../controllers/aplicationcontroller')
const { requireAuth, authenticateToken } = require('../middlewares/requiredauth')
const upload = require('../multer/imgConfig.js');



const router = express.Router()


router.post('/register-user', UserRegistration)
router.get('/get-users', GetUsers)
router.post('/user-login', UserLogin)

router.post('/jobs/apply/:jobId', requireAuth, ApplyForJob);
router.post('/profile', requireAuth, upload.single('profilePicture'), Profileregister)
router.put('/updateprofile/:id', updateProfile);

router.get('/getprofile/:id', Getprofile)














module.exports = router;