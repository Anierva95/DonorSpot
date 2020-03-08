$(document).ready(function () {
    var loginForm = $("#loginForm");
    var username = $("#username");
    var password = $("#password");
    var errorMsg = $(".error");
    $(loginForm).on("submit", handleFormSubmit)
    function handleFormSubmit() {
        event.preventDefault();
        var loginObj = {
            username: username.val().trim(),
            password: password.val().trim()
        }
        $.post("/api/users/login", loginObj).then(function (result) {
            console.log(result);
            if (result) {
                sessionStorage.setItem("userId", JSON.stringify(result.id));
                sessionStorage.setItem("userName", JSON.stringify(result.username))
                window.location.replace('/');
            } else {
                errorMsg.text("Incorrect username/password");
                
            }
        })
    };
});