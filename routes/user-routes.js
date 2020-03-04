const db = require("../models");

module.exports = function(app) {
    app.get("/api/users", function(req, res) {
        db.Users.findAll({
            include: [db.Charity]
        }).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });
}