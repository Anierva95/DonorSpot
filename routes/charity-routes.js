const db = require("../models");

module.exports = function (app) {
    app.get("/api/charity", function (req, res) {
        db.Charity.findAll({
            include: [db.Users, db.Transaction]
        }).then(function (dbCharity) {
            res.json(dbCharity);
        })
    });
    app.get("/", function (req, res) {
        db.Charity.findAll({
        }).then(function (dbCharity) {
            // console.log(dbCharity);
            let newCharity = []
            dbCharity.forEach(element => {
                let newData = element.dataValues
                newCharity.push(newData)
            });
            var newObject = {
                charities: newCharity
            };
            console.log(newObject);
            res.render("charity", newObject)
        })
    });
    app.post("/api/charity", function (req, res) {
        const newCharity = req.body;
        db.Charity.create(newCharity).then(function (dbCharity) {
            res.json(dbCharity);
        });
    });
    // BELOW WAS COMBINED INTO ANOTHER FUNCTION
    // app.get("/api/userCharity", function (req, res) {
    //     db.Charity.findAll({
    //         include: [db.Users, db.Transaction]
    //     }).then(function (dbUserCharity) {
    //         res.json(dbUserCharity);
    //         let newArray = [];
    //         let sum = parseInt(0);
    //         dbUserCharity.forEach(element => {
    //             let oldObject = {}
    //             oldObject.first_name = element.User.first_name;
    //             oldObject.last_name = element.User.last_name;
    //             let transaction = element.Transactions;
    //             console.log(transaction)
    //             transaction.forEach(elements => {
    //                 sum += parseInt(elements.dataValues.amount)
    //             });

    //             newArray.push(newObject)
    //         });
    //         console.log(newArray);
    //         console.log(sum);
    //     });
    // });
    app.get("/charity/:id", function (req, res) {
        db.Charity.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Users, db.Transaction]
        }).then(function (dbCharity) {
            let newArray = [];
            let oldObject = {};
            oldObject.id = dbCharity.id;
            oldObject.title = dbCharity.title;
            oldObject.descript = dbCharity.descript;
            oldObject.total = parseInt(0);
            oldObject.goal = parseInt(dbCharity.goal);
            oldObject.first_name = dbCharity.User.first_name;
            oldObject.last_name = dbCharity.User.last_name;
            let transaction = dbCharity.Transactions;
            transaction.forEach(elements => {
                oldObject.total += parseInt(elements.dataValues.amount)
            })
            oldObject.percent = (oldObject.total / oldObject.goal) * 100;
            // Second query
            let userTransactions = [];
            let TransactionObj = {};
            db.Transaction.findAll({
                where: {
                    CharityId: req.params.id
                },
                include: [db.Users]
            }).then(function (dbUsers) {
                // console.log(dbUsers[0]);
                // console.log(dbUsers[0].dataValues.User.dataValues.first_name); //zhao
                dbUsers.forEach(element => {
                    if (!element.dataValues.User.dataValues.first_name) {
                        TransactionObj.don_firstname = "Anonymous"
                        TransactionObj.donation = element.dataValues.amount;
                        userTransactions.push(TransactionObj);
                        TransactionObj = {};
                    } else {
                        TransactionObj.don_firstname = element.dataValues.User.dataValues.first_name
                        TransactionObj.donation = element.dataValues.amount;
                        // console.log(TransactionObj);
                        userTransactions.push(TransactionObj);
                        TransactionObj = {};
                    }
                    // delete TransactionObj.don_firstname;
                    // delete TransactionObj.don_amount
                });
                console.log(userTransactions);
            })
            newArray.push(oldObject)
            // console.log("oldObject: " + newArray); STILL PASSING THROUGH AFTER SECOND QUERY
            let renderObject = {
                charities: newArray, //has to be an array to render
                transactions: userTransactions
            };
            res.render("charitypage", renderObject)
        });
    });
};
