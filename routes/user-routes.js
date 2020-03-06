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
}