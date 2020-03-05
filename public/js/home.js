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
});