$(document).ready(function () {
    var userName = $("#username");
    var userPass = $("#password");
    var email = $("#email");
    var firstName = $("#firstname");
    var lastName = $("#lastname");
    var submit = $("#submitBtn");
    var signup = $("#signup");

    $(signup).on("submit", handleFormSubmit)
    function handleFormSubmit() {
        event.preventDefault();
        var newUsername = {
            username: userName.val().trim(), 
            passwd: userPass.val().trim(),        
            first_name: firstName.val().trim(),
            last_name: lastName.val().trim()
        }
        console.log(newUsername);

        // $.post("/api/charity", newCharity).then(function(result) {
        //     console.log(result);
        // })
    }
});