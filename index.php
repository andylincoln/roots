<?php include "base.php"; ?>

<!DOCTYPE html>
<html>

    <head>  
        <meta content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width">
        <title>Roots Ancestry Tracker</title>
        <!-- Include the jQuery library -->
        <script type="text/javascript" src="lib/jquery2.1.0/jquery-2.1.0.min.js"></script>
        <!-- Include the jQueryUI library  & it's CSS Theme-->
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
        <!-- Include Google Fonts -->
        <link href='http://fonts.googleapis.com/css?family=Port+Lligat+Slab|Roboto:400,500,700' rel='stylesheet' type='text/css'>
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
                if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) {

                    echo "<script>window.location = 'roots.html';</script>";
                } elseif (!empty($_POST['username']) && !empty($_POST['password'])) {
                    $username = mysql_real_escape_string($_POST['username']);
                    $password = md5(mysql_real_escape_string($_POST['password']));

                    $checklogin = mysql_query("SELECT * FROM users WHERE Username = '" . $username . "' AND Password = '" . $password . "'");

                    if (mysql_num_rows($checklogin) == 1) {
                        $row = mysql_fetch_array($checklogin);
                        $email = $row['EmailAddress'];

                        $_SESSION['Username'] = $username;
                        $_SESSION['EmailAddress'] = $email;
                        $_SESSION['LoggedIn'] = 1;

                        echo "<h1>Success</h1>";
                        echo "<p>We are now redirecting you to the application.</p>";
                        echo "<script>window.location = 'roots.html'</script>";
                    } else {
                        echo "<h1>Error</h1>";
                        echo "<p>Sorry, your account could not be found. Please <a href=\"index.php\">click here to try again</a>.</p>";
                    }
                } else {
                    ?>

                    <h1>Start Digging!</h1>
                    <form method="post" action="index.php" name="loginform" id="loginform">
                        <input type="text" name="username" id="username" placeholder="username" />
                        <input type="password" name="password" id="password" placeholder="password"/>
                        <input type="submit" name="login" id="login" value="Login" />
                    </form>

                    <?php
                }
                ?>

            </div>
            <script>
                $(document).ready(function() {
                    $("login").button();
                });
            </script>
        </div>
    </body>
</html>