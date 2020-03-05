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
        var newCharity = {
            title: charityName.val().trim(), // returns Henry's Fund
            goal: goal.val().trim(),         // returns 100000
            descript: descript.val().trim()  // returns To assist my...
        }
        console.log(newCharity);
        console.log(currency.val()); // returns $ 
        console.log(category.val()); // returns select dropdown
        console.log(`currency is ${currency} and category is ${category}`)
    }
});