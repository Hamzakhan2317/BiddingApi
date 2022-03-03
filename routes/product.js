const router = require("express").Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require("../models/userModel");
const {registerValidation,loginValidation,productValidation} = require('../validations/validation');
const { errorResponse, successResponse } = require('../common/response');
const { messages } = require('../common/messages');










module.exports = router;