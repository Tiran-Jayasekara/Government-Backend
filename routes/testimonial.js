const express = require("express");
const router = express.Router();

const { addTestimonials, TestimonialByCompany, UpdateTestimonials, deleteTestimonials } = require("../controllers/TestimonialsController");
const { verifyAuth } = require("../middleware/authUser");

router.post("/addTestimonials", verifyAuth, addTestimonials);
router.put("/updateTestimonials", verifyAuth, UpdateTestimonials);
router.get("/getTestmonials/:company", TestimonialByCompany);
router.delete("/deleteTestimonials/:id", verifyAuth, deleteTestimonials);

module.exports = router;