var path = require("path");

module.exports = function(app) {
    app.get("/charityForm", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/charityForm.html"));
    });
    app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/signup.html"));
    });
    app.get("/login", function(req, res) {
        res.sendFile(path.join(__dirname, "../views/login.html"));
    });

}

