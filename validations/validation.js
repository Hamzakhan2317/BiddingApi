const Joi = require("joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phoneNo:Joi.string().required()
  });

  const validate=schema.validate(data);
  return validate;
};
const loginValidation = data => {
  
  const schema = Joi.object({
    password: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  return schema.validate(data);
};
const productValidation = data =>{
  const schema = Joi.object({
    userId: Joi.string(),
    categoryType:Joi.string(),
    productName: Joi.string(),
    productTitle: Joi.string(),
    productDescription: Joi.string(),
    productPrice: Joi.number(),
    approval: Joi.bool(),
  });
  return schema.validate(data);
}

module.exports = {registerValidation,loginValidation,productValidation}