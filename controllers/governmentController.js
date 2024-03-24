const News = require("../models/newsModel")
const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Company = require("../models/governmentModal");

// This function for Validate company data
function validateCompany(req) {
    const schema = Joi.object({
        img: Joi.string().required(),
        name: Joi.string().required(),
        company: Joi.string().required(),
        status: Joi.required(),
        description: Joi.string().required(),
        coverimg: Joi.string().required(),
        profileimg: Joi.string().required(),
        city: Joi.string().required(),
        aboutUsimg: Joi.string().required(),
        vision: Joi.string().required(),
        mission: Joi.string().required(),
        whatWeDo: Joi.string().required(),
        whatWeDoUsimg: Joi.string().required(),
        services: Joi.required(),
    });
    return schema.validate(req);
}

// This method for add government company data
module.exports.addGovernmentCompany = async (req, res) => {
    try {
        const { error } = validateCompany(req.body);
        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const { img, name, company, status, description, coverimg, profileimg, city, aboutUsimg, vision, mission, whatWeDo, whatWeDoUsimg, services } = req.body;
            const isCompanyAlreadyExist = await Company.findOne({ company });
            if (isCompanyAlreadyExist) {
                res.status(200).json({ message: "This Company is Already Exist !" });
            } else {
                const companyData = await Company.create({
                    img, name, company, status, description, coverimg, profileimg, city, aboutUsimg, vision, mission, whatWeDo, whatWeDoUsimg, services
                });

                if (companyData) {
                    console.log("Company Add Successfull");
                    res.status(200).json({ message: "Company Add Successfull", companyData });
                } else {
                    res.status(200).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// This method for get all company data
module.exports.getAllCompany = async (req, res) => {
    try {
        constallCompanies = await Company.find({}).select('_id img name status company description');

        if (constallCompanies) {
            res.status(200).json({ message: "All Companies", constallCompanies });
        } else {
            res.status(200).json({ message: "No Companies" });
        }
    } catch (error) {
        res.status(200).json({ message: error.message });
    }
};


// This method for get one company data
module.exports.OneCompanyData = async (req, res) => {
    try {
        const companyName = req.params.company;
        const CompanyData = await Company.find({ company: companyName });
        if (CompanyData.length > 0) {
            res.status(200).json({ message: "Company Data", CompanyData });
        } else {
            res
                .status(200)
                .json({ message: `Couldn't find any CompanyData by this ${companyName}` });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// This method for update company data
module.exports.UpdateCompany = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        img: Joi.string().required(),
        name: Joi.string().required(),
        company: Joi.string().required(),
        status: Joi.required(),
        description: Joi.string().required(),
        coverimg: Joi.string().required(),
        profileimg: Joi.string().required(),
        city: Joi.string().required(),
        aboutUsimg: Joi.string().required(),
        vision: Joi.string().required(),
        mission: Joi.string().required(),
        whatWeDo: Joi.string().required(),
        whatWeDoUsimg: Joi.string().required(),
        services: Joi.required(),
    });

    try {
        const { _id, img, name, company, status, description, coverimg, profileimg, city, aboutUsimg, vision, mission, whatWeDo, whatWeDoUsimg, services } = req.body;
        const { error } = schema.validate({
            _id, img, name, company, status, description, coverimg, profileimg, city, aboutUsimg, vision, mission, whatWeDo, whatWeDoUsimg, services
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateCompany = await Company.findOneAndUpdate({ _id: _id }, { img, name, company, status, description, coverimg, profileimg, city, aboutUsimg, vision, mission, whatWeDo, whatWeDoUsimg, services }, { new: true });
            if (updateCompany) {
                res.status(200).json({ message: "Update Company", updateCompany });
            } else {
                res.status(400).json({ message: "Update UnSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// This method for update compnay status
module.exports.UpdateCompanyStatus = async (req, res) => {
    const schema = Joi.object({
        _id: Joi.required(),
        company: Joi.string().required(),
        status: Joi.required(),
    });

    try {
        const { _id, company, status } = req.body;
        const { error } = schema.validate({
            _id, company, status
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateCompanyStatus = await Company.findOneAndUpdate({ _id: _id }, { status }, { new: true });
            if (updateCompanyStatus) {
                res.status(200).json({ message: "Update Company Status", updateCompanyStatus });
            } else {
                res.status(400).json({ message: "Update Status UnSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}