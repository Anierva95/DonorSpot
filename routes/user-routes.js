const db = require("../models");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        db.Users.findAll({
            include: [db.Charity]
        }).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });
    app.post("/api/users", function(req, res) {
        const newUser = req.body;
        db.Users.create(newUser).then(function(dbUsers){
            res.json(dbUsers);
        })
    });

    app.get("/accounts/:id", function (req, res) {
        db.Users.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Charity, db.Transaction]
        }).then(function(dbAccount) {

            // Grab relevant userData into object
            const userDataObject = {
                username: dbAccount.dataValues.username,
                passwd: dbAccount.dataValues.passwd,
                email: dbAccount.dataValues.email,
                first_name: dbAccount.dataValues.first_name,
                last_name: dbAccount.dataValues.last_name
            }
            // Throw into array
            let userArray = [];
            userArray.push(userDataObject);

            // Grab relevant charity Data
            const userCharityObject = {};
            let userCharities = dbAccount.dataValues.Charities;
            let charityArray = [];
            let charityObj = {};

            // Index through each charity and create objects for each
            userCharities.forEach(charity => {
                charityObj.charityTitle = charity.dataValues.title;
                charityObj.charityGoal = charity.dataValues.goal;
                charityArray.push(charityObj);
                charityObj = {};
            })



        db.Transaction.findAll({
            where: {
                UserId: req.params.id
            },
            include:[db.Charity]
        }).then(function(dbUserTrans) {

            //Grab relevant data for each transaction made
            console.log(dbUserTrans[0].dataValues);
            console.log(dbUserTrans[0].dataValues.Charity.title);

            // Loop through and store each transaction object into the array
            let transactionArray = [];
            let transactionObj = {};
            let userTransactions = dbUserTrans;
            for (let transaction of userTransactions) {
                transactionObj.amount = transaction.dataValues.amount,
                transactionObj.charity = transaction.dataValues.Charity.title
                transactionArray.push(transactionObj);
                console.log(transactionObj);
                transactionObj = {};
            }

            // Assign each array to a part on the renderObject
            let renderObject = {
                user: userArray,
                charities: charityArray,
                transactions: transactionArray
            }
            console.log(renderObject);
            res.render("account",renderObject);
        })
        });
    })}
