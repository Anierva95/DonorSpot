const db = require("../models");
 
module.exports = function(app) {
    app.get("/api/charity", function(req, res) {
        db.Charity.findAll({
             include: [db.Users, db.Transaction]
        }).then(function(dbCharity) {
            res.json(dbCharity);
        })
    });
    app.get("/", function(req, res) {
        db.Charity.findAll({
             include: [db.Users]
        }).then(function(dbCharity) {
            console.log(dbCharity);
            let newCharity = 
            // res.json(dbCharity);
            res.render("charity", dbCharity)
        })
    })
}