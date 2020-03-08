$(document).ready(function () {
    var charityName = $("#charityName");
    var currency = $("#currency");
    var goal = $("#goal");
    var category = $("#category");
    var descript = $("#descript");
    var submit = $("#submitBtn");
    var charity = $("#charity");

    $(charity).on("submit", handleFormSubmit)

    function handleFormSubmit() {
        event.preventDefault();
        let userId = sessionStorage.getItem("userId");
        var newCharity = {
            title: charityName.val().trim(), // returns Henry's Fund
            goal: goal.val().trim(),         // returns 100000
            descript: descript.val().trim(),
            category: category.val(),
            UserId: userId,  // returns To assist my...
        }
        // console.log(newCharity);
        // console.log(currency.val()); // returns $ 
        // console.log(category.val()); // returns select dropdown
        console.log(newCharity);
        $.post("/api/charity", newCharity).then(function(result) {
            // console.log(result);
        })
    }
    const home = $(".Home");
    home.on("click", function() {
    window.location.replace("/");
    })});