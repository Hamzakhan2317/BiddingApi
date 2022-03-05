const router = require("express").Router();
let MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Products = require("../models/productModel");
const User = require("../models/userModel");
const { productValidation } = require("../validations/validation");
const { errorResponse, successResponse } = require("../common/response");
const { messages } = require("../common/messages");

router.post("/addProduct", async (req, res) => {
  var { error } = productValidation(req.body);

  if (!error) {
    
    var validUser = await User.findById({_id:req.body.userId})

    if(!validUser) return res.status(400).send(errorResponse("User not found!"))
    const addProductSchema = new Products({
      userId: req.body.userId,
      productName: req.body.productName,
      productTitle: req.body.productTitle,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      approval: req.body.approval,
    });

    try {
      const savedProducts = await addProductSchema.save();
      res.status(200).send(successResponse(savedProducts));
    } catch (error) {
      res.status(400).send(errorResponse(error));
    }
  } else {
    res.status(400).send(errorResponse(error.details[0].message));
  }
});

router.get("/getAllProducts", async (req, res) => {
  var Productslist = await Products.find()
    .then((result) => {
      res.send(successResponse(result))
    })
    .catch((error) => {
      res.send(errorResponse(error));
    });
});

router.post("/deleteProduct", async (req, res) => {
     var Productslist = await Products.findByIdAndDelete({_id:req.body._id})
       .then((result) => {
         res.status(200).send(successResponse("Product removed Successfully!"))
       })
       .catch((error) => {
         res.status(400).send(errorResponse(error));
       });
   });

module.exports = router;
