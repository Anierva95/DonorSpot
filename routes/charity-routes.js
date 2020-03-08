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
        db.Users.findAll({}).then(function (dbUsers) {
            console.log(dbUsers);
            if (dbUsers == "") {
                console.log("It's empty!")
                db.Users.create({
                    username: "Anonymous",
                    passwd: "12lkjasdiuqwelkzlkjuq",
                    email: "anon@anon.com",
                    first_name: "Anonymous",
                    last_name: "Anonymous"
                });
            }; //else {
            //     dbUsers.forEach(element => {
            //         if (element.dataValues.username != "Anonymous" || dbUsers == "") {
            //             console.log("Anon not found");
            //             db.Users.create({
            //                 username: "Anonymous",
            //                 passwd: "12lkjasdiuqwelkzlkjuq",
            //                 email: "anon@anon.com",
            //                 first_name: "Anonymous",
            //                 last_name: "Anonymous"
            //             });
            //         } else {
            //             console.log("Failed to find Anon");
            //         }
            //     });
            // };
        }).then(function (result) {
            console.log("yay we passed through " + result)
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
                // console.log(newObject);
                res.render("charity", newObject)
            })
        })
    });
    app.post("/api/charity", function (req, res) {
        const newCharity = req.body;
        db.Charity.create(newCharity).then(function (dbCharity) {
            res.json(dbCharity);
        });
    });

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
                dbUsers.forEach(element => {
                    if (!element.dataValues.User.dataValues.first_name) {
                        TransactionObj.don_firstname = "Anonymous"
                        TransactionObj.donation = element.dataValues.amount;
                        userTransactions.push(TransactionObj);
                        TransactionObj = {};
                    } else {
                        TransactionObj.don_firstname = element.dataValues.User.dataValues.first_name
                        TransactionObj.donation = element.dataValues.amount;
                        userTransactions.push(TransactionObj);
                        TransactionObj = {};
                    }
                });
                console.log(userTransactions);
            })
            newArray.push(oldObject)
            let renderObject = {
                charities: newArray,
                transactions: userTransactions
            };
            res.render("charitypage", renderObject)
        });
    });
};
