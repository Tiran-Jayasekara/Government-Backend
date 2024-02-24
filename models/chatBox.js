const mongoose = require("mongoose");

// This is schema for Admin
const ChatBoxSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Please Enter Your Token"],
        },
        message: {
            type: String,
            required: [true, "Please Enter Your message"],
        }
    },
    { timestamps: true }
);

const Chat = mongoose.model.Chat || mongoose.model("Chat", ChatBoxSchema);

module.exports = Chat;
