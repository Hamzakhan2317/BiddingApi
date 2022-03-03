const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//import routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');

//Middlewares
app.use(express.json());

//Connect DataBase
mongoose.connect(process.env.Db_connect,{useNewUrlParser:true},
     (err) => {
          if(err) console.log(err) 
          else console.log("mongdb is connected!");
         });

//Routes Middlwares
app.use("/api/user",authRoute);
app.use("/api/product",productRoute);



app.listen(3000 , ()=>{ console.log("server Started") })