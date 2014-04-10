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


// This is the temporary file used to keep track of changes to the tree
$filename = null;

?>