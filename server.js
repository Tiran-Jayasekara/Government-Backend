const express = require("express");
const database = require("./database/database");
// const Product = require("./models/ProductModels");


const app = express();
const port = 3001;
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.options("*", cors());

const adminRouter = require("./routes/admin");
const newsRouter = require("./routes/news")
const companyRouter = require("./routes/company")
const messageRouter = require("./routes/message")
const itemRouter = require("./routes/item");
const testimonialRouter = require("./routes/testimonial")
const shopRouter = require("./routes/shop");


app.use("/testimonials", testimonialRouter);
app.use("/admin", adminRouter);
app.use("/news", newsRouter);
app.use("/company", companyRouter);
app.use("/shop", shopRouter);
app.use("/message", messageRouter);
app.use("/item", itemRouter);


app.listen(port, () => {
  console.log(`Node JS app listening on port ${port}`);
  database();
});