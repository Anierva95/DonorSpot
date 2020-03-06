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
            oldObject.title = dbCharity.title;
            oldObject.descript = dbCharity.descript;
            oldObject.total = parseInt(0);
            oldObject.goal = dbCharity.goal;
            oldObject.first_name = dbCharity.User.first_name;
            oldObject.last_name = dbCharity.User.last_name;
            let transaction = dbCharity.Transactions;
            // console.log(transaction)
            transaction.forEach(elements => {
                oldObject.total += parseInt(elements.dataValues.amount)
            })
            newArray.push(oldObject)
            // return newArray;
            // console.log(newArray);
            let renderObject = {
                charities: newArray //has to be an array to render
            }
            console.log(renderObject);
            res.render("charitypage", renderObject)
            // res.json(newArray);
        })
    });
};
