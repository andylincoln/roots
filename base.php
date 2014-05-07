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

    $filename = $username . ".json";
    $tmp = "/tmp/";                         // Absolute path to temp directory
    $dest = dirname(__FILE__) . "/json/";   // Destination folder absolute path
    $tree = $_POST['tree'];

    fopen($tmp . $filename, 'w');              // Create file in tmp with write permissions
    file_put_contents($tmp . $filename, $tree); //Add the JSON from the POST

    chmod($tmp . $filename, 0755);              //Change the permissions to be web-friendly

    exec("cp " . $tmp . $filename . " " . $dest . $filename); // Copy
    
    if (file_exists($tmp . $filename)) {
        exec("rm " . $tmp . $filename); // Remove temp
    }
}

?>