const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/authUser");

const { addGovernmentCompany, getAllCompany, OneCompanyData, UpdateCompany, UpdateCompanyStatus } = require("../controllers/governmentController");

router.post("/addCompany", verifyAuth, addGovernmentCompany);
router.get("/getAllCompany", getAllCompany);
router.get("/getCompanyData/:company", OneCompanyData);
router.put("/updateCompany", verifyAuth, UpdateCompany);
router.put("/UpdateCompanyStatus", verifyAuth, UpdateCompanyStatus);


module.exports = router;