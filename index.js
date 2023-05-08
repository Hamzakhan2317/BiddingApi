const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//import routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const categoriesRoute = require("./routes/categories");
const accountRoute = require("./routes/account");

//Middlewares
app.use(express.json());

//Connect DataBase
mongoose.connect(process.env.Db_connect, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log("mongdb is connected!");
});

//Routes Middlwares
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/accounts", accountRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("server Started");
});
