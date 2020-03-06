const db = require("../models");

module.exports = function (app) {
    app.get("/api/charity", function (req, res) {
        db.Charity.findAll({
             include: [db.Users, db.Transaction]
        }).then(function(dbCharity) {
            res.json(dbCharity);
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
            var newObject = {
                charities: newCharity
            };
            res.render("charity", newObject)
        })
    });
   app.post("/api/charity", function(req, res) {
       const newCharity = req.body;
       db.Charity.create(newCharity).then(function(dbCharity) { 
            res.json(dbCharity);
       });
   });
   app.get("/charity/:id", function (req, res) {
    db.Charity.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (dbCharity) {
        // res.json(dbCharity);
        let newCharity = [];
        newCharity.push(dbCharity.dataValues)
        let newObject = {
            charities: newCharity
        };
        console.log(newObject)
        res.render("charitypage", newObject);
    });
});
};