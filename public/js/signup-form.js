$(document).ready(function () {
    var userName = $("#username");
    var userPass = $("#password");
    var email = $("#email");
    var firstName = $("#firstname");
    var lastName = $("#lastname");
    var signup = $("#signup");

    $(signup).on("submit", handleFormSubmit)
    function handleFormSubmit() {
        event.preventDefault();
        var newUsername = {
            username: userName.val().trim(),
            passwd: userPass.val().trim(),
            email: email.val().trim(),
            first_name: firstName.val().trim(),
            last_name: lastName.val().trim()
        }
        $.post("/api/users", newUsername).then(function (result) {
            console.log("This is the " + result)
            if (result) {
                window.location.replace("/")
            }
        })
    }
    const home = $(".Home");
    home.on("click", function () {
        window.location.replace("/");
    })
});