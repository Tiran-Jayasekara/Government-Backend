const express = require("express");
const database = require("./database/database");
// const Product = require("./models/ProductModels");
const { mongo } = require("mongoose");

const app = express();
const port = 3001;
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.options("*", cors());

const adminRouter = require("./routes/admin");
const newsRouter =  require("./routes/news")

app.use("/admin" ,adminRouter);
app.use("/news",newsRouter);

app.listen(port, () => {
    console.log(`Node JS app listening on port ${port}`);
    database();
  });