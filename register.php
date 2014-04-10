<?php include "base.php"; ?>
<!DOCTYPE html>
<html>  
    <head>
        <meta content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width"/>
        <title>Roots Ancestry Tracker</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <!-- Include the jQuery library -->
        <script type="text/javascript" src="lib/jquery2.1.0/jquery-2.1.0.min.js"></script>

        <!-- Include the jQueryUI library  & it's CSS Theme-->
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>

        <!-- Include jQuery Validation plugin -->
        <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>

        <!-- Include Google Fonts -->
        <link href='http://fonts.googleapis.com/css?family=Port+Lligat+Slab|Roboto:400,500,700' rel='stylesheet' type='text/css'>

        <!-- Link to page style -->
        <link rel="stylesheet" href="css/index.css" />
    </head>  
    <body>  
        <header>
            <div id="logo" class="wrapper">
                <img src="css/img/roots-logo-small.png" style="float:left;"> 
            </div>

            <div id="accountLinks">
                <ul>
                    <li><a href="index.php">Log In</a></li>
                    <li><p style="display:inline;">|</p></li>
                    <li><a href="register.php">Sign Up</a></li>
                </ul>

            </div>
        </header>

        <div id="body">
            <div id="main">
                <?php
                if (!empty($_POST['username']) && !empty($_POST['password'])) {
                    /* If the user is not logged in                             */
                    /* Grab the username and password from the form submission  */
                    $username = mysql_real_escape_string($_POST['username']);
                    $password = md5(mysql_real_escape_string($_POST['password']));
                    $email = mysql_real_escape_string($_POST['email']);

                    $checkusername = mysql_query("SELECT * FROM users WHERE Username = '" . $username . "'");

                    if (mysql_num_rows($checkusername) == 1) {
                        /* If the username is taken */
                        echo "<h1>Error</h1>";
                        echo "<p>Sorry, that username is taken. Please go back and try again.</p>";
                    } else {
                        /* Enter the username into the database */
                        $registerquery = mysql_query("INSERT INTO users (Username, Password, EmailAddress) VALUES('" . $username . "', '" . $password . "', '" . $email . "')");
                        if ($registerquery) {
                            /* If successfully entered, create json file for storing their tree */

                            $filename = '/tmp/' . $username . '.json';
                            fopen($filename, "a+");
                            /* If the file was created, report the success, otherwise inform the user */
                            if (file_exists($filename)) {
                                echo "<h1>Success</h1>";
                                echo "<p>Your account was successfully created. Please <a href=\"index.php\">click here to login</a>.</p>";
                            } else {
                                $registerquery = mysql_query("DELETE FROM users WHERE Username='" . $username . "'");
                                echo "<h1>Error</h1>";
                                echo "<p>Sorry, something went wrong! Please go back and try again.</p>";
                            }
                        } else {
                            echo "<h1>Error</h1>";
                            echo "<p>Sorry, something went wrong! Please go back and try again.</p>";
                        }
                    }
                } else {
                    ?>

                    <h1>Register</h1>

                    <form method="post" action="register.php" name="registerForm" id="registerForm">
                        <div>
                            <input type="text" name="username" id="username" placeholder="Username"/>
                        </div>
                        <div>
                            <input type="password" name="password" id="password" placeholder="Password"/>
                        </div>
                        <div>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"/>
                        </div>
                        <div>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div>
                            <input type="email" name="confirmEmail" id="confirmEmail" placeholder="Confirm email"/>
                        </div>
                        <div>
                            <input type="submit" name="register" id="register" value="Register" class="small-button"/>
                        </div>
                    </form>

                    <?php
                }
                ?>

            </div>
            <script src="js/register.js"></script>
        </div>
    </body>
</html>