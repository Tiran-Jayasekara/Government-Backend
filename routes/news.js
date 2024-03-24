const express = require("express");
const router = express.Router();

const { addNews, UpdateNews, getAllNews, deleteNews, NewsByCompany , UpdateNewsCoverImg } = require("../controllers/newsController");
const { verifyAuth } = require("../middleware/authUser");


router.get("/getNews", getAllNews);
router.post("/addNews", verifyAuth, addNews);
// router.post("/getAdmin", Login);
router.put("/updateNews", verifyAuth, UpdateNews);
router.put("/UpdateNewsCoverImg", verifyAuth, UpdateNewsCoverImg)
router.get("/getNewsByCompany/:company", NewsByCompany);
router.delete("/deleteNews/:id", verifyAuth, deleteNews);

module.exports = router;