const db = require("../models");
 
module.exports = function(app) {
    app.get("/api/charity", function(req, res) {
        db.Charity.findAll({
             include: [db.Users]
        }).then(function(dbCharity) {
            res.json(dbCharity);
        })
    })
}