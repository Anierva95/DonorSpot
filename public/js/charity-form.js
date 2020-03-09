$(document).ready(function () {
    var charityName = $("#charityName");
    var currency = $("#currency");
    var goal = $("#goal");
    var category = $("#category");
    var summary = $("#summary");
    var descript = $("#descript");
    var submit = $("#submitBtn");
    var charity = $("#charity");
    var stopSubmit = $("#stopSubmit");

    $(charity).on("submit", handleFormSubmit)

    if (sessionStorage.getItem("userId")) {
        // console.log("There is a userId");
        $(".welcome").text("Hello, " + JSON.parse(sessionStorage.getItem("userName")));
        document.getElementById("signup").style.visibility = "hidden";
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("logout").style.display = "block";
    } else {
        document.getElementById("logout").style.display = "none";
    };
    // console.log("No userId");

    function handleFormSubmit() {
        event.preventDefault();
        if (!sessionStorage.getItem("userId")) {
            stopSubmit.text("You need to create an account or login to create a charity.");
            return;
        } else if (goal.val() < 10) {
            stopSubmit.text("You have not set a goal higher than what is required.");
        }
        let userId = sessionStorage.getItem("userId");
        var newCharity = {
            title: charityName.val().trim(),
            goal: goal.val().trim(),
            descript: descript.val().trim(),
            summary: summary.val().trim(),
            category: category.val(),
            UserId: userId,
        }
        // console.log(newCharity);
        $.post("/api/charity", newCharity).then(function (result) {
            // console.log(result.id)
            if (result) {
                window.location.replace("/charity/" + result.id)
            }
        })
    }
    const home = $(".Home");
    home.on("click", function () {
        window.location.replace("/");
    })
});