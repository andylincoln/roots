/* 
 * Author: Andrew Lincoln
 * Date Created: 03/26/2014 11:00 PM
 * 
 * jQuery Validation plugin for the register.php page
 * 
 * register.js
 */

$(document).ready(function() {

    function validate() {
        $("#registerForm").validate({
            errorElement: "p",
            rules: {
                username: {
                    required: true,
                    minlength: 5,
                    maxlength: 15
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 20
                },
                confirmPassword: {
                    equalTo: "#password"
                },
                email: {
                    email: true,
                    required: true
                },
                confirmEmail: {
                    equalTo: "#email"
                }
            },
            messages: {
                username: {
                    required: "Please provide a username"
                },
                password: {
                    required: "Please provide a password"
                },
                confirmPassword: {
                    equalTo: "Passwords do not match"
                },
                email: {
                    required: "Please provide a valid email address",
                    email: "Please enter in the form of john@doe.com"
                },
                confirmEmail: {
                    equalTo: "Emails do not match"
                }
            },
            errorPlacement: function(error, element) {

                error.insertAfter(element);
                error.addClass("ui-helper-reset ui-state-error-text");
            }
        });
    }

    $("#register").button();
    $("#register").submit(validate());
});