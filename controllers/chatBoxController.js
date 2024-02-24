const Chat = require("../models/chatBox")
const cron = require('node-cron');


module.exports.addMessage = async (req, res) => {
    try {
        const { token, message } = req.body
        const data = await Chat.create({ token, message });
        if (data) {
            res.status(200).json({ message: "Message Add Success", data })
            console.log("New Message Add");
        } else {
            res.status(400).json({ message: "Message Add unSuccess" })
        }
    } catch (error) {
        res.status(400).json({ message: "Message Add UnSuccess", error })
    }
}

module.exports.getAllMessages = async (req, res) => {
    try {
        const messageData = await Chat.find({});
        if (messageData) {
            res.status(200).json({ message: messageData })
        } else {
            res.status(400).json({ message: messageData })
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

cron.schedule('0 */1 * * *', async () => {
    console.log('Two hours');
    try {
        // Calculate the date one day ago
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate());
        // Find and delete news older than one day
        await Chat.deleteMany({ createdAt: { $lt: oneDayAgo }});
        console.log(oneDayAgo);
    } catch (error) {
        console.error('Error deleting outdated news:', error);
    }
});