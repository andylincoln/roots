<?php
include 'base.php';

/*
 *  © 2014 alincoln
 *  roots
 *  save.php 
 *  Created on: Apr 23, 2014 
 */

/**
 * If the user is logged in, 
 * check if there is a POST.
 * 
 * If there is a POST, call the save 
 * function to do all the saving dirtywork
 */
if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) {
    $username = $_SESSION['Username'];
// If there is a tree post, save it
    if (array_key_exists('tree', $_POST)) {
        echo $_POST['tree'];
        save($username);
    }
} else {
    echo "ERROR: No session";
}

?>