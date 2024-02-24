const express = require("express");
const router = express.Router();

const { addTestimonials, TestimonialByCompany, UpdateTestimonials, deleteTestimonials } = require("../controllers/TestimonialsController");
const { verifyAuth } = require("../middleware/authUser");

router.post("/addTestimonials", addTestimonials);
router.put("/updateTestimonials", UpdateTestimonials);
router.get("/getTestmonials/:company", TestimonialByCompany);
router.delete("/deleteTestimonials/:id", deleteTestimonials);

module.exports = router;