const db = require("../models");

module.exports = function (app) {
    app.get("/api/charity", function (req, res) {
        db.Charity.findAll({
            include: [db.Users]
        }).then(function (dbCharity) {
            res.json(dbCharity);
            // res.render("charity", dbCharity)
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
            // console.log(newCharity);
            res.render("charity", newObject)
        })
    })
};