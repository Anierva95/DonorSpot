const db = require("../models");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        db.Users.findAll({
            include: [db.Charity]
        }).then(function(dbUsers) {
            // console.log(dbUsers)
            res.json(dbUsers);
        });
    });
    app.post("/api/users", function(req, res) {
        const newUser = req.body;
        db.Users.create(newUser).then(function(dbUsers){
            res.json(dbUsers);
        })
    });
    // app.get("/", function(req, res){
    //     db.Users.findAll({}).then(function(dbUsers){
    //         console.log(dbUsers);
    //     })
    // })

    app.get("/accounts/:id", function (req, res) {
        console.log(req.params.id)
        db.Users.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Charity, db.Transaction]
        }).then(function(dbAccount) {
            console.log(dbAccount);
            res.json(dbAccount);
        })
        // res.render("account", result)
        // db.Users.findAll({}).then(function (dbUsers) {
        //     console.log(dbUsers);
        // }).then(function (result) {
        //     res.render("account", result)
        // })
    });
}