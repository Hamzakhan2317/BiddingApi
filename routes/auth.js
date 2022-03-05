const router = require("express").Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require("../models/userModel");
const {registerValidation,loginValidation} = require('../validations/validation');
const { errorResponse, successResponse } = require('../common/response');
const { messages } = require('../common/messages');

router.post("/register", async (req, res) => {

  var  {error}  = registerValidation(req.body);

  if (!error) { 

    const emailExists=await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send(errorResponse(messages.userExists))

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phoneNo:req.body.phoneNo
    });

    try {
      const savedUser = await user.save();
      res.send(successResponse(savedUser));
    } catch (error) {
      res.status(400).send(errorResponse(error));
    }

  } else {
    res.status(400).send(errorResponse(error.details[0].message));
  }
});

//Login Api
router.post("/login", async(req,res)=>{

  const {error} = loginValidation(req.body);

  if(!error){
    
     const emailExists=await User.findOne({email:req.body.email});
     if(!emailExists) return res.status(400).send(errorResponse(messages.loginFailedMessage)) 
       //check for password
         const validPassword=await User.findOne({password:req.body.password})
         if(!validPassword) return res.status(400).send(errorResponse(messages.loginFailedMessage)) 
          //  res.send(successResponse(messages.loginSuccess))
           
           const token = jwt.sign({_id:user._id},process.env.Token)
           res.header('auth-token',token).send([successResponse("Login Succefull!"),{"auth-token":token}]);
  }else{
    res.status(400).send(errorResponse(error.details[0].message))
  }

});
module.exports = router;
