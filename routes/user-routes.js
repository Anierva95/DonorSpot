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
        console.log("This is req params " + req.params.id)
        db.Users.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Charity, db.Transaction]
        }).then(function(dbAccount) {
            console.log(dbAccount.dataValues.Transactions);
            res.json(dbAccount.dataValues.Transactions);
        })
        // res.render("account", result)
    });
}