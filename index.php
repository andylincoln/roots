<?php include "base.php"; ?>

<!DOCTYPE html>
<html>  
    <head>  
        <meta content="text/html; charset=utf-8" />  
        <title>Roots Login</title>
    </head>

    <body>  

        <div id="main">
            <?php
            if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) {

                echo "<script>$(document).ready(window.location = 'roots.html');</script>";

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

                    <h1>Member Login</h1>

                    <p>Thanks for visiting! Please either login below, or <a href="register.php">click here to register</a>.</p>

                    <form method="post" action="index.php" name="loginform" id="loginform">
                        <fieldset>
                            <label for="username">Username:</label><input type="text" name="username" id="username" /><br />
                            <label for="password">Password:</label><input type="password" name="password" id="password" /><br />
                            <input type="submit" name="login" id="login" value="Login" />
                        </fieldset>
                    </form>

    <?php
}
?>

        </div>
    </body>
</html>


</div>


</body>
</html>