// This section applies to the donationForm.html
$(document).ready(function () {
    let submitDonation = $("#submitDonation");
    let donateAmount = $("#donation");
    $(submitDonation).on("submit", handleFormSubmit)
    if (sessionStorage.getItem("userId")) {
        // console.log("There is a userId");
        $(".welcome").text("Hello, " + JSON.parse(sessionStorage.getItem("userName")));
        document.getElementById("signup").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
    } else {
        document.getElementById("logout").style.display = "none";
    };
    // console.log("No userId");

    function handleFormSubmit() {
        event.preventDefault();
        if (!sessionStorage.getItem("userId")) {
            localId = 1
            // console.log("Yay we're donating as anon")
        } else {
            localId = sessionStorage.getItem("userId");
            // console.log("I'm a real user")
        }
        let btnId = localStorage.getItem("charityId");
        var newDonation = {
            amount: donateAmount.val().trim().split(",").join(""),
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