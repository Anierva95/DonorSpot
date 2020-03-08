// This section applies to the donationForm.html
$(document).ready(function () {
    let submitDonation = $("#submitDonation");
    let donateAmount = $("#donation");
    $(submitDonation).on("submit", handleFormSubmit)
    if (sessionStorage.getItem("userId")) {
        console.log("There is a userId");
        $(".welcome").text("Hello, " + JSON.parse(sessionStorage.getItem("userName")));
        document.getElementById("signup").style.display = "none";
        document.getElementById("login").style.display = "none";
    } else {
        console.log("No userId");
    }
    function handleFormSubmit() {
        event.preventDefault();
        let localId = sessionStorage.getItem("userId");
        let btnId = localStorage.getItem("charityId");
        var newDonation = {
            amount: donateAmount.val().trim(),
            CharityId: btnId,
            UserId: localId
        }
        $.post("/api/transaction", newDonation).then(function (result) {
            window.location.replace("/charity/" + btnId)
        })
    };
    $(".Home").on("click", function () {
        window.location.replace("/");
    })
});