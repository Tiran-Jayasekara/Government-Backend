const express = require("express");
const router = express.Router();

const { addItem, ItemByShop, UpdateItem, deleteItem, getItemsBySearch, getRandomItemsByItemType, deleteItemByCompany, AllItems, getSelectetItems, shuffleItems, uplodeManyItems } = require("../controllers/itemController");
const { verifyAuth } = require("../middleware/authUser");


// router.get("/getNews", getAllNews);
router.post("/addItem", addItem);
router.get("/getItem/:shopId", ItemByShop);
router.get("/AllItems", AllItems);
router.get("/getSelectetItems/:number", getSelectetItems);
router.get("/getItemBySearch/:search", getItemsBySearch);
router.get("/getRandomItemsByItemType", getRandomItemsByItemType);
router.put("/updateItem", UpdateItem);
// router.post("/getAdmin", Login);
// router.put("/updateNews",verifyAuth, UpdateNews);
// router.get("/getNewsByCompany/:company", NewsByCompany);
router.delete("/deleteItem/:id", deleteItem);
router.delete("/deleteItemByCompany/:company", deleteItemByCompany);


router.get("/shuffleItems", shuffleItems);
router.post("/uplodeManyItems", uplodeManyItems);

module.exports = router;