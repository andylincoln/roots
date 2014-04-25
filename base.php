<?php
// From http://code.tutsplus.com/tutorials/user-membership-with-php--net-1523
// Grabs session information for use with user management

session_start();


/*           Database Information      */
$dbhost = "localhost"; 
$dbname = "alincoln"; 
$dbuser = "alincoln"; 
$dbpass = "al3445";

mysql_connect($dbhost, $dbuser, $dbpass) or die("MySQL Error: " . mysql_error());
mysql_select_db($dbname) or die("MySQL Error: " . mysql_error());


/**
 * Take the username as argument (username is set in roots.php upon login)
 * Assign the filename, use temp directory
 * Create the file and grab the data from the post
 */
function save($username) {
    $filename =  $username . ".json";
    $tree = $_POST['tree'];
    file_put_contents("/tmp/" . $filename, $tree);
    //shell_exec("cp $tmp $filename json/"); TODO: Get this working
}

?>