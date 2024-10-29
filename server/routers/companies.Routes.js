// import mongoose from "mongoose";
const express = require('express');
const { CreateCompany, approvecompanyrequest, LoginCompany, Logoutcompany, VerifyCompany } = require('../controllers/Companycontroller');






const router = express.Router()



router.post('/companies-register', CreateCompany);
router.post('/verify-company', VerifyCompany);
router.post('/companies-login', LoginCompany)
router.post('/companies-logout', Logoutcompany);
router.patch('/approve-company/:id', approvecompanyrequest);








module.exports = router;