const db = require("../models");

module.exports = function (app) {
    app.get("/api/charity", function (req, res) {
        db.Charity.findAll({
             include: [db.Users, db.Transaction]
        }).then(function(dbCharity) {

            res.json(dbCharity);
            // res.render("charity", dbCharity)
        })
    });
    app.get("/", function (req, res) {
        db.Charity.findAll({
        }).then(function (dbCharity) {
            console.log(dbCharity);
            let newCharity = []
            dbCharity.forEach(element => {
                let newData = element.dataValues
                newCharity.push(newData)
            });
            let randomNum = Math.floor(Math.random() * Math.floor(newCharity.length) + 1);

            var newObject = {
                charities: newCharity
            };
            // console.log(newCharity);
            res.render("charity", newObject)
        })
    });
    // app.get("/", function(req, res) {
    //     db.Charity.findAll({
    //          include: [db.Users]
    //     }).then(function(dbCharity) {
    //         console.log(dbCharity);
    //         let newCharity = 
    //         // res.json(dbCharity);
    //         res.render("charity", dbCharity)
    //     })
    // })
};