$(document).ready(function () {
    var userName = $("#username");
    var userPass = $("#password");
    var email = $("#email");
    var firstName = $("#firstname");
    var lastName = $("#lastname");
    var signup = $("#signup");

    $(signup).on("submit", handleFormSubmit)
    function handleFormSubmit() {
        var newUsername = {
            username: userName.val().trim(), 
            passwd: userPass.val().trim(), 
            email: email.val().trim(),       
            first_name: firstName.val().trim(),
            last_name: lastName.val().trim()
        }
        console.log(newUsername);

        $.post("/api/users", newUsername).then(function(result) {
            console.log(result);
        })
    }
    const home = $(".Home");
    home.on("click", function() {
    window.location.replace("/");
    })
});