<?php
// From http://code.tutsplus.com/tutorials/user-membership-with-php--net-1523
// Grabs session information for use with user management

session_start();

$dbhost = "localhost"; // this will ususally be 'localhost', but can sometimes differ
$dbname = "alincoln"; // the name of the database that you are going to use for this project
$dbuser = "alincoln"; // the username that you created, or were given, to access your database
$dbpass = "al3445"; // the password that you created, or were given, to access your database

mysql_connect($dbhost, $dbuser, $dbpass) or die("MySQL Error: " . mysql_error());
mysql_select_db($dbname) or die("MySQL Error: " . mysql_error());
?>