const News = require("../models/newsModel")
const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



function validateNews(req) {
    const schema = Joi.object({
        header: Joi.string().min(3).required(),
        location: Joi.string().required(),
        image: Joi.string().min(5).required(),
        date: Joi.string(),
        time: Joi.string(),
        company: Joi.string().required(),
        description: Joi.string()
    });
    return schema.validate(req);
}

module.exports.addNews = async (req, res) => {
    try {
        const { error } = validateNews(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const { header, location, image, date, time, company, description } = req.body;
            const isNewsAlreadyExist = await News.findOne({ header });
            if (isNewsAlreadyExist) {
                res.status(200).json({ message: "This News is Already Exist !" });
            } else {

                const news = await News.create({
                    header, location, image, date, time, company, description
                });

                if (news) {
                    console.log("News Add Successfull");
                    res.status(200).json({ message: "News Add Successfull", news });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.UpdateNews = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        header: Joi.string().min(3).required(),
        location: Joi.string().required(),
        image: Joi.string().min(5).required(),
        date: Joi.string(),
        time: Joi.string(),
        company: Joi.string().required(),
        description: Joi.string()
    });

    try {
        const { _id, header, location, image, date, time, company, description } = req.body;
        const { error } = schema.validate({
            _id, header, location, image, date, time, company, description
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateNews = await News.findOneAndUpdate({ _id: _id }, { header, location, image, date, time, company, description }, { new: true });
            if (updateNews) {
                res.status(200).json({ message: "Update Success", updateNews });
            } else {
                res.status(400).json({ message: "Update UnSuccess" });
            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.getAllNews = async (req, res) => {
    try {
        const allNews = await News.find({});

        if (allNews) {
            res.status(200).json({ message: "All News", allNews });
        } else {
            res.status(400).json({ message: "No News" });
        }
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
};

module.exports.deleteNews = async (req, res) => {
    try {
        const newsId  = req.params.id;
        const deleteNews = await News.findByIdAndDelete(newsId);
        if (deleteNews) {
            res.status(200).json({ message: "News Delete Success", deleteNews })
        } else {
            res.status(400).json({ message: "Couldnt find News " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports.NewsByCompany = async (req, res) => {
    try {
        const companyName = req.params.company;
        const NewsByCompany = await News.find({ company: companyName });
        if (NewsByCompany.length > 0) {
            res.status(200).json({ message: "News By Company", NewsByCompany });
        } else {
            res
                .status(200)
                .json({ message: "Couldn't find any News by this Company" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};