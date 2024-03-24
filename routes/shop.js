const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/authUser");


const { addShop, getAllShops, OneShopData, UpdateShop, deleteShop, UpdateShopStatus } = require("../controllers/shopController");

router.post("/addShop", verifyAuth, addShop);
router.get("/getAllShops", getAllShops);
router.get("/getShopData/:shop", OneShopData);
router.put("/updateShop", verifyAuth, UpdateShop);
router.put("/updateShopStatus", verifyAuth, UpdateShopStatus);
router.delete("/deleteShop/:id", verifyAuth, deleteShop);

module.exports = router;