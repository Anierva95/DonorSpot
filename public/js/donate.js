// This section applies to the donationForm.html
$(document).ready(function () {
    let submitDonation = $("#submitDonation");
    let donateAmount = $("#donation");

    $(submitDonation).on("submit", handleFormSubmit)
    function handleFormSubmit() {
        // event.preventDefault();
        let localId = sessionStorage.getItem("userId");
        // if (!localId) {
        //     localId = ""
        // };
        let btnId = localStorage.getItem("charityId");
        // console.log("btnId: " + btnId);
        // console.log("localId: " + localId);
        // console.log(donateAmount.val().trim());
        var newDonation = {
            amount: donateAmount.val().trim(),
            CharityId: btnId,
            UserId: localId
        }
        // console.log(newDonation);
        $.post("/api/transaction", newDonation).then(function (result) {
            console.log(result);
        })
    };
    $(".Home").on("click", function () {
        window.location.replace("/");
    })
});