const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
    {
        header: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
        },
        company: {
            type: String,
        },
        description: {
            type: String,
        }
        ,
        showdate: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const News = mongoose.model.News || mongoose.model("News", NewsSchema);

module.exports = News;
