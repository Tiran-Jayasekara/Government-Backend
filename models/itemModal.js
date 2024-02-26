const mongoose = require("mongoose");

// This is Schema for news
const ItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        companyId: {
            type: String,
            required: true,
        },
        availability: {
            type: Boolean,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        itemType: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }
);

const Item = mongoose.model.Item || mongoose.model("Item", ItemSchema);

module.exports = Item;
