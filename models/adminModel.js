const mongoose = require("mongoose");

// This is schema for Admin
const AdmminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
        },
        password: {
            type: String,
            required: [true, "Please Enter Password"],
        },
        role: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
        },
        status: {
            type: Boolean,
        },
        company: {
            type: String,
            required: true,
        },
        companyType: {
            type: String,
            required: true,
        },
        descroption: {
            type: String,
        }
    },
    { timestamps: true }
);

const Admin = mongoose.model.Admin || mongoose.model("Admin", AdmminSchema);

module.exports = Admin;
