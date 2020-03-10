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
            };
        }).then(function (result) {
            console.log("yay we passed through " + result)
            db.Charity.findAll({
            }).then(function (dbCharity) {
                // console.log(dbCharity);
                let imageArr = [
                    "https://source.unsplash.com/collection/1125042/1280x960",
                    "https://source.unsplash.com/collection/375719/1280x960",
                    "https://source.unsplash.com/collection/3053437/1280x960",
                    "https://source.unsplash.com/collection/1927934/1280x960",
                    "https://source.unsplash.com/collection/9042806/1280x960",
                    "https://source.unsplash.com/collection/1270951/1280x960",
                    "https://source.unsplash.com/collection/3106804/1280x960",
                    "https://source.unsplash.com/collection/181581/1280x960",
                    "https://source.unsplash.com/collection/225/1280x960",
                    "https://source.unsplash.com/collection/208403/1280x960",
                    "https://source.unsplash.com/collection/2489501/1280x960",
                    "https://source.unsplash.com/collection/1110/1280x960",
                ]
                let newCharity = []
                dbCharity.forEach(element => {
                    let newData = element.dataValues
                    let ranNum = Math.floor(Math.random() * Math.floor(imageArr.length))
                    // console.log(ranNum);
                    newData.image_url = imageArr[ranNum];
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

    function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }
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
            oldObject.summary = dbCharity.summary;
            oldObject.descript = dbCharity.descript;
            oldObject.total = parseInt(0);
            oldObject.goal = thousands_separators(parseInt(dbCharity.goal));
            oldObject.first_name = dbCharity.User.first_name;
            oldObject.last_name = dbCharity.User.last_name;
            let transaction = dbCharity.Transactions;
            transaction.forEach(elements => {
                oldObject.total += parseInt(elements.dataValues.amount)
            })
            oldObject.percent = (oldObject.total / oldObject.goal) * 100;
            oldObject.total = thousands_separators(oldObject.total);
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
                    // Creating object of arrays with first name and donation
                    if (!element.dataValues.User.dataValues.first_name) {
                        TransactionObj.don_firstname = "Anonymous"
                        TransactionObj.donation = element.dataValues.amount;
                        userTransactions.push(TransactionObj);
                        TransactionObj = {};
                    } else {
                        TransactionObj.don_firstname = element.dataValues.User.dataValues.first_name
                        TransactionObj.donation = thousands_separators(element.dataValues.amount);
                        userTransactions.push(TransactionObj);
                        TransactionObj = {};
                    }
                });
                newArray.push(oldObject);
                let renderObject = {
                    charities: newArray,
                    transactions: userTransactions
                };
                console.log(renderObject);
                res.render("charitypage", renderObject)
            })

        });
    });
};
