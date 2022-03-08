const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const category = require("../models/categoriesModel");
const { errorResponse, successResponse } = require("../common/response");
const { messages } = require("../common/messages");
const { append } = require("express/lib/response");

router.get("/getCategories", async (req, res) => {
  var Categorylist = await category.find()
    .then((result) => {
      res.send(successResponse(result));
    })
    .catch((error) => {
      res.send(errorResponse(error));
    });
});



module.exports =router