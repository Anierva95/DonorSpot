const db = require("../models");
const sequelize = require('sequelize');

module.exports = function(app) {
    app.get("/api/transaction", function(req, res) {
        db.Transaction.findAll({
            include: [db.Charity]          
        }).then(function(dbTransaction) {
            res.json(dbTransaction);
        })
    });
    app.get("/api/transactionSum", function(req, res) {
        db.Transaction.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('amount')), 'Total']]
        }).then(function(sumTotal) {
            res.json(sumTotal);
        });
    });
    app.post("/api/transaction", function(req, res) {
        console.log(req.body);
        let newTransaction = req.body;
        db.Transaction.create(newTransaction).then(function(dbTransaction){
            res.json(dbTransaction);
        })
    });
};