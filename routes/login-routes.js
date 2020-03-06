const db = require("../models");
module.exports = function (app) {
 app.post('/api/users/login', function (req, res) {
var username = req.body.username;
        var password = req.body.password;
        if (username && password) {
            db.Users.findOne({
                where: {
                    username: username,
                    passwd: password
                }
            }).then(function (results) {
res.json(results);
            });
        }
    });
}

