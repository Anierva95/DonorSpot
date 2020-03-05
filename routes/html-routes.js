var path = require("path");

module.exports = function(app) {
    app.get("/charityForm", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/charityForm.html"));
    })
}