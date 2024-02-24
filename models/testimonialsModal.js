const mongoose = require("mongoose");

// This is Schema for news
const TestimonialsSchema = new mongoose.Schema(
    {
        header: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        role: {
            type: String,
        },
        company: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }
);

const Testimonials = mongoose.model.Testimonials || mongoose.model("Testimonials", TestimonialsSchema);

module.exports = Testimonials;
