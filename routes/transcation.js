const router = require("express").Router();
const Products = require("../models/productModel");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");
const Transfer = require("../models/transferModel");
const { transactionValidation } = require("../validations/validation");
const { errorResponse, successResponse } = require("../common/response");
const { messages } = require("../common/messages");

//add
router.post("/transaction", async (req, res) => {
    // console.log("ASAS")
    var { error } = transactionValidation(req.body);
    // console.log("sdsd")

    //res.status(400).send(errorResponse("User not found!"));

    if (!error) {
        var accntFound = await Account.findOne({ _id: req.body.accountId });

        if (accntFound) {
            if (req.body.transcationType === "income") {


                let calculatedAmount = accntFound.balance + req.body.amount
                console.log('accntFound', accntFound);
                console.log('calculatedAmount', calculatedAmount);
                // const accModify = Account({
                //     ...accntFound, balance: calculatedAmount
                // })
                const updatedAccount = await Account.findOneAndUpdate(
                    { _id: req.body.accountId }, // Query criteria to find the document to update
                    { balance: calculatedAmount }, // The data to update the document with
                    { new: true }
                );

                console.log("ASAS")
                const IncomeADD = new Income({
                    desc: req.body.desc,
                    userId: req.body.userId,
                    accountId: req.body.accountId,
                    category: req.body.category,
                    amount: req.body.amount,
                    transcationType: req.body.transcationType
                });


                try {
                    const savedIncome = await IncomeADD.save();
                    const upAccounts = await updatedAccount.save();
                    // const savedAcc = await accModify.save();

                    res.send(successResponse(savedIncome));
                } catch (error) {
                    res.status(400).send(errorResponse(error));
                }


            } else if (req.body.transcationType === "expense") {
                if (req.body.amount > accntFound.balance) {
                    res.status(400).send(errorResponse('amount is greater than the actual amount'));
                } else {
                    let calculatedAmount = accntFound.balance - Number(req.body.amount)
                    const updatedAccount = await Account.findOneAndUpdate(
                        { _id: req.body.accountId }, // Query criteria to find the document to update
                        { balance: calculatedAmount }, // The data to update the document with
                        { new: true }
                    );

                    const ExpenseADD = new Expense({
                        desc: req.body.desc,
                        userId: req.body.userId,
                        accountId: req.body.accountId,
                        category: req.body.category,
                        amount: req.body.amount,
                        transcationType: req.body.transcationType,
                    });

                    try {
                        const savedIncome = await ExpenseADD.save();
                        const savedAcc = await updatedAccount.save();
                        res.send(successResponse(savedIncome));
                    } catch (error) {
                        res.status(400).send(errorResponse(error));
                    }

                }

            } else if (req.body.transcationType === "transfer") {
                if (req.body.amount > accntFound.balance) {
                    res.status(400).send(errorResponse('amount is greater than the actual amount'));
                } else {
                    let calculatedAmount = accntFound.balance - Number(req.body.amount)
                    const updatedAccount = await Account.findOneAndUpdate(
                        { _id: req.body.accountId }, // Query criteria to find the document to update
                        { balance: calculatedAmount }, // The data to update the document with
                        { new: true }
                    );
                    const TransferADD = new Transfer({
                        desc: req.body.desc,
                        userId: req.body.userId,
                        accountId: req.body.accountId,
                        category: req.body.category,
                        amount: req.body.amount,
                        transcationType: req.body.transcationType,
                    });

                    try {
                        const savedTransfer = await TransferADD.save();
                        const savedAcc = await updatedAccount.save();
                        res.send(successResponse(savedTransfer));
                    } catch (error) {
                        res.status(400).send(errorResponse(error));
                    }

                }
            } else {
                res.status(400).send(errorResponse({ code: 0, status: 'failed', message: 'transaction type is invalid .please add following income,transfer and expense' }));
            }


        } else {
            res.status(400).send(errorResponse({ code: 0, status: 'failed', message: 'Account not found' }));
        }

    } else {
        res.status(400).send(errorResponse(error.details[0].message));
    }
});

//get
router.get("/transaction", async (req, res) => {
    let { type, userId } = req.body;
    let IncomeData = await Income.find({ userId });
    let ExpenseData = await Expense.find({ userId });
    let tranferData = await Transfer.find({ userId });

    if (type === 'income') {
        res.status(200).send(successResponse(IncomeData));
    } else if (type === 'expense') {
        res.status(200).send(successResponse(ExpenseData));
    } else if (type === 'transfer') {
        res.status(200).send(successResponse(tranferData));
    } else if (type === 'all') {
        let allData = [
            ...IncomeData, ...ExpenseData, ...tranferData
        ]
        res.status(200).send(successResponse(allData));
    } else {
        res.send(errorResponse(error));
    }
});

//getbyId
router.get("/transaction", async (req, res) => {
    var Categorylist = await Products.find({ _id: req.params.id })
        .then((result) => {
            res.send(successResponse(result));
        })
        .catch((error) => {
            res.send(errorResponse(error));
        });
});

//Delete 
router.delete("/transaction", async (req, res) => {
    var Productslist = await Products.findByIdAndDelete({ _id: req.body.userId })
        .then((result) => {
            res.status(200).send(successResponse("Product removed Successfully!"));
        })
        .catch((error) => {
            res.status(400).send(errorResponse(error));
        });
});

module.exports = router;
