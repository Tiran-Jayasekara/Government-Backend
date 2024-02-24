const express = require("express");
const router = express.Router();


const { addShop, getAllShops, OneShopData, UpdateShop, deleteShop , UpdateShopStatus } = require("../controllers/shopController");

router.post("/addShop", addShop);
router.get("/getAllShops", getAllShops);
router.get("/getShopData/:shop", OneShopData);
router.put("/updateShop", UpdateShop);
router.put("/updateShopStatus", UpdateShopStatus);
router.delete("/deleteShop/:id", deleteShop);

module.exports = router;