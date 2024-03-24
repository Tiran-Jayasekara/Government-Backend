const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/authUser");

const { addItem, ItemByShop, UpdateItem, deleteItem, getItemsBySearch, getRandomItemsByItemType, deleteItemByCompany, AllItems, getSelectetItems, shuffleItems, uplodeManyItems } = require("../controllers/itemController");


router.post("/addItem", verifyAuth, addItem);
router.get("/getItem/:shopId", ItemByShop);
router.get("/AllItems", AllItems);
router.get("/getSelectetItems/:number", getSelectetItems);
router.get("/getItemBySearch/:search", getItemsBySearch);
router.get("/getRandomItemsByItemType", getRandomItemsByItemType);
router.put("/updateItem", verifyAuth, UpdateItem);
router.delete("/deleteItem/:id", verifyAuth, deleteItem);
router.delete("/deleteItemByCompany/:company", verifyAuth, deleteItemByCompany);


router.get("/shuffleItems", verifyAuth, shuffleItems);
router.post("/uplodeManyItems", verifyAuth, uplodeManyItems);

module.exports = router;