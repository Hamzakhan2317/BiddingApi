const router = require("express").Router();
const Products = require("../models/productModel");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");
const Transfer = require("../models/transferModel");
const { accountValidation } = require("../validations/validation");
const { errorResponse, successResponse } = require("../common/response");
const { messages } = require("../common/messages");

//add
router.post("/account", async (req, res) => {
    var { error } = accountValidation(req.body);

    //res.status(400).send(errorResponse("User not found!"));

    if (!error) {
        var accnt = await Account.find();
        let acctFound = accnt?.find(({ name }) => name === req.body.name)
        let userFound = User.findById({ _id: req.body.userId })

        if (!acctFound && userFound) {
            const addAccountSchema = new Account({
                userId: req.body.userId,
                name: req.body.name,
                balance: req.body.balance,
            });
            try {
                const savedAccounts = await addAccountSchema.save();
                Account.find()
                    .then((result) => {
                        res.send(successResponse(result));
                    })
                    .catch((error) => {
                        res.send(errorResponse(error));
                    });
                // res.status(200).send(successResponse(datas));
            } catch (error) {
                res.status(400).send(errorResponse(error));
            }
        } else {
            res
                .status(400)
                .send(
                    errorResponse(
                        'userId doesnt exists or \n' + req.body.name + "Account Type Already exists Please enter a valid Account Name!"
                    )
                );
        }
    } else {
        res.status(400).send(errorResponse(error.details[0].message));
    }
});

//get
router.get("/account", async (req, res) => {
    await Expense.find();
    await Income.find();
    await Transfer.find();
    var Accountslist = await Account.find()
        .then((result) => {
            res.send(successResponse(result));
        })
        .catch((error) => {
            res.send(errorResponse(error));
        });
});

//getbyId
router.get("/account", async (req, res) => {
    var Categorylist = await Products.find({ _id: req.params.id })
        .then((result) => {
            res.send(successResponse(result));
        })
        .catch((error) => {
            res.send(errorResponse(error));
        });
});

//Delete 
router.delete("/account", async (req, res) => {
    var Productslist = await Products.findByIdAndDelete({ _id: req.body.userId })
        .then((result) => {
            res.status(200).send(successResponse("Product removed Successfully!"));
        })
        .catch((error) => {
            res.status(400).send(errorResponse(error));
        });
});

module.exports = router;
