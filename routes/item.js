const express = require("express");
const router = express.Router();

const { addItem, ItemByCompany , UpdateItem , deleteItem } = require("../controllers/itemController");
const { verifyAuth } = require("../middleware/authUser");


// router.get("/getNews", getAllNews);
router.post("/addItem", addItem);
router.get("/getItem/:company", ItemByCompany);
router.put("/updateItem", UpdateItem);
// router.post("/getAdmin", Login);
// router.put("/updateNews",verifyAuth, UpdateNews);
// router.get("/getNewsByCompany/:company", NewsByCompany);
router.delete("/deleteItem/:id",deleteItem);

module.exports = router;