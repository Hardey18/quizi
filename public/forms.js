$(document).ready(function () {
    //Registration Function
    $('.welcome3').click(function (event) {
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
        if (password != repeatpassword) {
            $('.regMessage').html('Password does not match');
            $('#password').css('border', '2px solid red');
            $('#repeatpassword').css('border', '2px solid red');
            return;
        }

        //make get request to check if the user already exist
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?email=${email}`,
            data: {
                email,
            },
            beforeSend: function() {
                $('.regMessage').html('Loading...');
            },
            success: function(response) {
                if(response.length) {
                    $('.regMessage').html('User with this Email already exist');
                    $('#email').css('border', '2px solid red');
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
                            window.location = "http://localhost:3000/questions.html";
                        },
                    });
                }
            },
        });
    });
    //Login function
    $('.welcome3').click(function(event) {
        event.preventDefault();
        const emailLogin = $('#emailLogin').val();
        const passwordLogin = $('#passwordLogin').val();

        //check if user input is empty
        if(!emailLogin || !passwordLogin) {
            $('.regMessage').html('Kindly fill in all fields');
            return;
        }

        //check if the user is in the database
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/users?email=${emailLogin}&password=${passwordLogin}`,
            data: {
                email: emailLogin,
                password: passwordLogin,
            },
            beforeSend: function() {
                $('.regMessage').html('Loading...');
            },
            success: function(response) {
                if(response.length) {
                    localStorage.setItem('email', emailLogin);
                    window.location = "http://localhost:3000/questions.html";
                } else {
                    $('.regMessage').html('Username or password incorrect')
                }
            },
        });
    });

    //admin login function
    $('.adminBtn').click(function(event) {
        event.preventDefault();
        const adminEmail = $('#adminEmail').val();
        const adminPassword = $('#adminPassword').val();
        if (!adminEmail || !adminPassword) {
            $('.regMessage').html('Kindly fill in all fields');
            return;
        }

        //Check if the user is in the database
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/adminLogin?email=${adminEmail}&password=${adminPassword}`,
            data: {
                email: adminEmail,
                password: adminPassword,
            },
            beforeSend: function() {
                $('.regMessage').html('Loading...');
            },
            success: function(response) {
                if(response.length) {
                    localStorage.setItem('email', adminEmail);
                    window.location = "http://localhost:3000/order.html";
                } else {
                    $('.regMessage').html('Username or password incorrect');
                }
            },
        });
    });

    //Logout function
    $('.logoutBtn').click(function() {
        //clear the local storage and redirect to signup page
        localStorage.clear();
        $('.checkLogin').html('Kindly login');
        window.location.assign('http://localhost:3000/signup.html')
    });
});