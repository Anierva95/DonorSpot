$(document).ready(function () {
    var loginForm = $("#loginForm");
    var username = $("#username");
    var password = $("#password");
    $(loginForm).on("submit", handleFormSubmit)
    function handleFormSubmit() {
        event.preventDefault();
        var loginObj = {
            username: username.val().trim(),
            password: password.val().trim()
        }
        $.post("/api/users/login", loginObj).then(function (result) {
            console.log(result);
            if (result.id >= 1) {
                sessionStorage.setItem("userId", JSON.stringify(result.id));
                sessionStorage.setItem("userName", JSON.stringify(result.username))
                window.location.replace('/');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
        })
    };
});