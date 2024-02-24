const express = require("express");
const router = express.Router();


const {addMessage , getAllMessages} = require('../controllers/chatBoxController')
router.post("/addMessage", addMessage);
router.get("/getMessage", getAllMessages);

module.exports = router;