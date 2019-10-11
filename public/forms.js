$(document).ready(function() {
    //Registration Function
    $('#signUpBtn').click(function(event) {
        event.preventDefault();
        const firstname = $('#firstname').val();
        const lastname = $('#lastname').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const repeatpassword = $('#repeatpassword').val();

        //Check if user input is empty
        if (!firstname || !lastname || !email || !password || !repeatpassword) {
            $('.regMessage').html('Kindly fill in all fields');
            return;
        }

        //check if password match
        if(password !== repeatpassword) {
            $('.regMessage').html('Password does not match');
            $('#password').css('border', '2px solid red');
            $('#repeatpassword').css('border', '2px solid red');
            return;
        }

        //make get request to check if the user already exist
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/users?email=${email}',
            data: {
                email,
            },
            beforeSend: function() {
                $('.regMessage').html('Loading...');
            },
            success: function(response) {
                if(response.length) {
                    $('.regMessage').html('User already exist');
                } else {
                    //submit the user data if the user does not exist
                    $.ajax({
                        method: 'POST',
                        url: 'http://localhost:3000/users',
                        data: {
                            firstname,
                            lastname,
                            email,
                            password
                        },
                        beforeSend: function() {
                            $('.regMessage').html('Loading...');
                        },
                        success: function() {
                            // $('.regMessage').html('Registration Successful');
                            window.location = "http://localhost:3000/question.html";
                        },
                    });
                }
            },
        });
    });
    //Login function
    $('.welcome3').click(function(event) {
        event.preventDefault();
        const usernameLogin = $('#usernameLogin').val();
        const passwordLogin = $('#passwordLogin').val();

        //check if user input is empty
        if(!usernameLogin || !passwordLogin) {
            $('.regMessage').html('Kindly fill in all fields');
            return;
        }

        //check if the user is in the database
        $.ajax({
            method: 'GET',
        })
    })
})