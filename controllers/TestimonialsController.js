const Testimonials = require("../models/testimonialsModal");
const Joi = require("joi").extend(require("@joi/date"));

function validateNews(req) {
    const schema = Joi.object({
        header: Joi.string().min(3).required(),
        image: Joi.string().min(5).required(),
        topic: Joi.string(),
        name: Joi.string(),
        role: Joi.string(),
        company: Joi.string().required(),
        description: Joi.string(),
    });
    return schema.validate(req);
}
module.exports.addTestimonials = async (req, res) => {
    try {
        const { error } = validateNews(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const { header, image, topic, name, role, company, description } = req.body;

            const Testimonial = await Testimonials.create({
                header, image, topic, name, role, company, description
            });

            if (Testimonial) {
                res.status(200).json({ message: "Testimonial Add Successfull", Testimonial });
            } else {
                res.status(400).json({ message: "Testimonial add Unsuccess" });
            }

        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.TestimonialByCompany = async (req, res) => {
    try {
        const companyName = req.params.company;
        const TestimonialByCompany = await Testimonials.find({ company: companyName });
        if (TestimonialByCompany.length > 0) {
            res.status(200).json({ message: "Testimonial By Company", TestimonialByCompany });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any Testimonial by this Company" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.UpdateTestimonials = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.string().min(3).required(),
        header: Joi.string().min(3).required(),
        image: Joi.string().min(5).required(),
        topic: Joi.string(),
        name: Joi.string(),
        role: Joi.string(),
        company: Joi.string().required(),
        description: Joi.string(),
    });

    try {
        const { _id, header, image, topic, name, role, company, description } = req.body;
        const { error } = schema.validate({
            _id, header, image, topic, name, role, company, description
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateTestimonials = await Testimonials.findOneAndUpdate({ _id: _id }, { header, image, topic, name, role, company, description }, { new: true });
            if (updateTestimonials) {
                res.status(200).json({ message: "update Testimonials Success", updateTestimonials });
            } else {
                res.status(400).json({ message: "update Testimonials UnSuccess" });
            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.deleteTestimonials = async (req, res) => {
    try {
        const TestimonialsId = req.params.id;
        const deleteTestimonialsId = await Testimonials.findByIdAndDelete(TestimonialsId);
        if (deleteTestimonialsId) {
            res.status(200).json({ message: "TestimonialsId Delete Success", deleteTestimonialsId })
        } else {
            res.status(400).json({ message: "Couldnt find TestimonialsId " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}