const mongoose = require("mongoose");

// This is schema for company
const NewsSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        coverimg: {
            type: String,
            required: true,
        },

        profileimg: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        aboutUsimg: {
            type: String,
            required: true,
        },
        vision: {
            type: String,
            required: true,
        },
        mission: {
            type: String,
            required: true,
        },
        whatWeDo: {
            type: String,
            required: true,
        },
        whatWeDoUsimg: {
            type: String,
            required: true,
        }
        ,
        services: [
            {
              name: {
                type: String,
                required: true,
              },
              img: {
                type: String,
                required: true,
              },
              description: {
                type: String,
                required: true,
              },
            },
          ],
    },
    { timestamps: true }
);

const Company = mongoose.model.Company || mongoose.model("Company", NewsSchema);

module.exports = Company;
