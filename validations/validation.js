const Joi = require("joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email().regex(/^[a-zA-Z0-9._%+-]+@ucp\.edu\.pk$/).required(),
    phoneNo: Joi.string().required()
  });

  const validate = schema.validate(data);
  return validate;
};
const loginValidation = data => {

  const schema = Joi.object({
    password: Joi.string(),
    edu: Joi.boolean(),
    email: Joi.string().email(),
  });

  return schema.validate(data);
};
const productValidation = data => {
  const schema = Joi.object({
    userId: Joi.string(),
    categoryType: Joi.string(),
    productName: Joi.string(),
    productTitle: Joi.string(),
    productDescription: Joi.string(),
    productPrice: Joi.number(),
    approval: Joi.bool(),
  });
  return schema.validate(data);
}
const accountValidation = data => {
  const schema = Joi.object({
    userId: Joi.string(),
    name: Joi.string(),
  });
  return schema.validate(data);
}
const transactionValidation = data => {
  const schema = Joi.object({
    userId: Joi.string(),
    desc: Joi.string(),
    accountId: Joi.string(),
    toAccountId: Joi.string().optional(),
    category: Joi.string(),
    transcationType: Joi.string(),
    amount: Joi.number(),
  });
  return schema.validate(data); 
}

const driverValidation = data => {
  const schema = Joi.object({
    userId: Joi.string(),
    departureLocation: Joi.string(),
    vehicleType: Joi.string(),
    noOfSeats: Joi.number(),
  });
  return schema.validate(data);
}

module.exports = { registerValidation, loginValidation, productValidation, transactionValidation, accountValidation, driverValidation }