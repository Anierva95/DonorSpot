const db = require("../models");

module.exports = function(app) {
    app.get("/api/transaction", function(req, res) {
        db.Transaction.findAll({
            include: [db.Charity]          
        }).then(function(dbTransaction) {
            res.json(dbTransaction);
        })
    })
}