// import mongoose from "mongoose";
const express = require('express');
const getJobsList = require('../controllers/jobsController.js');
const { createNewJob, Getjobsbycategories, GetjobsbycompanyId } = require('../controllers/createJobByComp.js');
const upload = require('../multer/imgConfig.js');
const { requireAuth } = require('../middlewares/requiredauth.js')



const router = express.Router()



router.post("/create-new-jobs", upload.single('companyLogo'), requireAuth, createNewJob)

router.get('/jobs-by-category/:category', Getjobsbycategories)
router.get('/get-jobs-companyId', requireAuth, GetjobsbycompanyId)
router.get("/getjobs/:id?", getJobsList)





module.exports = router;