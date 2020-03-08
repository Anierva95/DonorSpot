$(document).ready(function () {
    var charityName = $("#charityName");
    var currency = $("#currency");
    var goal = $("#goal");
    var category = $("#category");
    var descript = $("#descript");
    var submit = $("#submitBtn");
    var charity = $("#charity");

    $(charity).on("submit", handleFormSubmit)

    if (sessionStorage.getItem("userId")) {
        console.log("There is a userId");
        $(".welcome").text("Hello, " + JSON.parse(sessionStorage.getItem("userName")));
        document.getElementById("signup").style.visibility = "hidden";
        document.getElementById("login").style.visibility = "hidden";
    } else {
        console.log("No userId");
    }

    function handleFormSubmit() {
        event.preventDefault();
        let userId = sessionStorage.getItem("userId");
        var newCharity = {
            title: charityName.val().trim(), 
            goal: goal.val().trim(),        
            descript: descript.val().trim(),
            category: category.val(),
            UserId: userId, 
        }
        console.log(newCharity);
        $.post("/api/charity", newCharity).then(function (result) {
            console.log(result.id)
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