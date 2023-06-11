const router = require("express").Router();
const Products = require("../models/productModel");
const User = require("../models/userModel");
const Account = require("../models/accountModel");
const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");
const Transfer = require("../models/transferModel");
const { driverValidation } = require("../validations/validation");
const { errorResponse, successResponse } = require("../common/response");
const { messages } = require("../common/messages");
const Driver = require("../models/driverModal");

//add
router.post("/driver", async (req, res) => {
    var { error } = driverValidation(req.body);

    //res.status(400).send(errorResponse("User not found!"));

    if (!error) {
        let userFound = User.findById({ _id: req.body.userId })

        if (userFound) {
            const addDriverSchema = new Driver({
                userId: req.body.userId,
                noOfSeats: req.body.noOfSeats,
                vehicleType: req.body.vehicleType,
                departureLocation: req.body.departureLocation,
            });
            try {
                const savedDriver = await addDriverSchema.save();
                res.status(200).send(successResponse({ status: "Driver added Successfully!" }));
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

router.get("/driver", async (req, res) => {
    const currentTime = new Date();  // Get the current time

    // Subtract 30 minutes from the current time
    const deletionTime = new Date(currentTime.getTime() - (30 * 60 * 1000));

    await Driver.find()
        .then((result) => {
            const filteredResult = result.filter((post) => {
                // Check if the post creation time is before the deletion time
                const postCreationTime = new Date(post.date);
                return postCreationTime < deletionTime;
            });

            // Delete the filtered posts
            filteredResult.forEach(async (post) => {
                await Driver.findByIdAndDelete(post._id);
            });

            res.send(successResponse(result));
        })
        .catch((error) => {
            res.send(errorResponse(error));
        });
});

// getbyId
router.post("/driverById", async (req, res) => {
    console.log('first', req.params)

    let userFound = await User.find()


    await Driver.findById({ _id: req.body.id })
        .then((result) => {
            let dataa = {
                departureLocation: result?.departureLocation,
                noOfSeats: result?.noOfSeats,
                userId: result?.userId,
                date: result?.date,
                phoneNo: userFound.find(({ _id }) => _id == result.userId)?.phoneNo
            }
            res.send(successResponse(dataa));
        })
        .catch((error) => {
            console.log('err', error)
            res.status(500).send(errorResponse(error));
        });
});

//Delete 
// router.delete("/account", async (req, res) => {
//     var Productslist = await Products.findByIdAndDelete({ _id: req.body.userId })
//         .then((result) => {
//             res.status(200).send(successResponse("Product removed Successfully!"));
//         })
//         .catch((error) => {
//             res.status(400).send(errorResponse(error));
//         });
// });

module.exports = router;
