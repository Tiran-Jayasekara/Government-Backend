const express = require("express");
const router = express.Router();

const { addAdmin, Login, UpdateAdmin, deleteAdmin, updateAdminStatus, getAdminByCompany } = require("../controllers/adminController");
const { verifyAuth } = require("../middleware/authUser");

router.get("/getAdmin/:company", getAdminByCompany);
router.post("/addAdmin", addAdmin);
router.post("/loginAdmin", Login);
router.put("/updateAdmin", UpdateAdmin);
router.put("/updateAdminStatus", updateAdminStatus);
router.delete("/deleteAdmin", verifyAuth, deleteAdmin);

module.exports = router;