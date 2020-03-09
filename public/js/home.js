$(document).ready(function () {
    const createCharity = $(".createCharity");
    createCharity.on("click", function(){
        window.location.replace("/charityForm");
    })
    const signUp = $(".signup");
    signUp.on("click", function() {
        window.location.replace("/signup");
    })
    const logIn = $(".login");
    logIn.on("click", function() {
    window.location.replace("/login");
    })
    $(".cardsss").on("click",function(){
        console.log("success")
    })
    const logOut = $(".logout");
    logOut.on("click", function() {
    console.log("clicked");
    sessionStorage.clear();
    window.location.reload();
    });


    $(".welcome").on("click", function() {
        const userId = sessionStorage.getItem("userId");
        console.log(userId);
        $.get("/accounts/" + userId).then(function (result) {

            if (result) {
            window.location.replace("/accounts/" + userId);
            }
        })
    })
});