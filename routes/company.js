const express = require("express");
const router = express.Router();


const { addGovernmentCompany , getAllCompany , OneCompanyData , UpdateCompany , UpdateCompanyStatus} = require("../controllers/governmentController");

router.post("/addCompany", addGovernmentCompany);
router.get("/getAllCompany", getAllCompany);
router.get("/getCompanyData/:company", OneCompanyData);
router.put("/updateCompany", UpdateCompany);
router.put("/UpdateCompanyStatus", UpdateCompanyStatus);


module.exports = router;