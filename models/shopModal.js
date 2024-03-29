const mongoose = require("mongoose");

// This is schema for company
const ShopSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true,
        },
        coverImg: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        shop: {
            type: String, // Assuming shop is a string identifier or name
            required: true,
        },
        shopType: {
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
        whatWeProvideHeader: {
            type: String,
            required: true,
        },
        whatWeProvideDescription: {
            type: String,
            required: true,
        },
        whatWeProvide: [
            {
                img: {
                    type: String,
                    required: true,
                },
                topic: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
            },
        ],
        gallery: {
            type: {
                img1: String,
                img2: String,
                img3: String,
                img4: String,
                img5: String,
            },
            required: true,
        },
        testimonialsImg: {
            type: String,
            required: true,
        },
        mapLocation: {
            type: String,
            required: true,
        },
        getInTouch: {
            type: {
                number: String,
                openingDate: String,
                openingtime: String
            },
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        deleteShop: {
            type: Boolean, // Assuming deleteShop is a boolean flag
            required: true,
        },
    },
    { timestamps: true }
);

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
