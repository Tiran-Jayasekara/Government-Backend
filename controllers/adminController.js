const Admin = require("../models/adminModel")
const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



function validateAdmin(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email(),
        password: Joi.string().min(5).max(20).required(),
        mobile: Joi.string(),
        status: Joi.boolean(),
        role: Joi.string().required(),
        company: Joi.string().required(),
        companyType : Joi.string().required(),
        description: Joi.string()
    });
    return schema.validate(req);
}

// This method For get admin data by Company
module.exports.getAdminByCompany = async (req, res) => {
    try {
        const companyName = req.params.company;

        const AdminByCompany = await Admin.find({ company: companyName, role: { $ne: 'editor' } });
        if (AdminByCompany.length > 0) {
            res.status(200).json({ message: "Admin By Company", AdminByCompany });
        } else {
            res.status(200).json({ message: "Couldn't find any News by this Company" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// This method for Register admin to the system
module.exports.addAdmin = async (req, res) => {
    try {
        const { error } = validateAdmin(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const { name, email, password, role, mobile, status, company,companyType ,description } = req.body;
            const isUserAlreadyExist = await Admin.findOne({ email });
            if (isUserAlreadyExist) {
                res.status(200).json({ message: "This email is Already Exist !" });
            } else {
                const hash = await bcrypt.hash(password, 10);

                const admin = await Admin.create({
                    name,
                    email,
                    password: hash,
                    role,
                    mobile,
                    status,
                    company,
                    companyType,
                    description
                });

                if (admin) {
                    console.log("User Add Successfull");
                    res.status(200).json({ message: "User Add Successfull", admin });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// This method for Login Admin
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkAdmin = await Admin.findOne({ email });
        if (checkAdmin) {
            const match = await bcrypt.compare(password, checkAdmin.password);
            if (match) {
                const token = jwt.sign(
                    {
                        id: checkAdmin._id,
                        email: checkAdmin?.email,
                        role: checkAdmin?.role,
                        company: checkAdmin?.company,
                    },
                    "default_secret_key",
                    { expiresIn: "1d" }
                );

                res.status(200).json({ message: "Login Success", checkAdmin, token });
            } else {
                res.status(200).json({ message: "Password Is Wrong" });
            }
        } else {
            res.status(200).json({ message: "Email Not Register" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//This method For Update Admin Data
module.exports.UpdateAdmin = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email(),
        password: Joi.string().min(5).required(),
        mobile: Joi.string(),
        status: Joi.boolean(),
        role: Joi.string().required(),
        company: Joi.string().required(),
        companyType: Joi.string().required(),
        description: Joi.string()
    });

    try {
        const { _id, name, email, password, role, mobile, status, company,companyType, description } = req.body;
        const { error } = schema.validate({
            name, email, password, role, mobile, status, company,companyType, description
        });

        if (error) {
            res.status(400).json({ message: error.message });
        } else {

            const updateAdmin = await Admin.findOneAndUpdate({ _id: _id }, { name, email, password, role, mobile, status, company,companyType, description }, { new: true });
            if (updateAdmin) {
                res.status(200).json({ message: "Update Success", updateAdmin });
            } else {
                res.status(400).json({ message: "Update UnSuccess" });
            }
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// This method for Update Admin Status
module.exports.updateAdminStatus = async (req, res) => {

    const schema = Joi.object({
        status: Joi.boolean().required(),
    });
    try {
        const { _id, status } = req.body;
        const { error } = schema.validate({
            status
        })
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            const updateAdmin = await Admin.findOneAndUpdate({ _id: _id }, { status: status }, { new: true });
            if (updateAdmin) {
                res.status(200).json({ message: "Update Admin Status Success", updateAdmin });
            } else {
                res.status(400).json({ message: "Update UnSuccess" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// This method For Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;
        const deleteAdmin = await Admin.findByIdAndDelete(adminId);
        if (deleteAdmin) {
            res.status(200).json({ message: "AdminDelete Success", deleteAdmin })
        } else {
            res.status(400).json({ message: "Couldnt find an Admin " });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



