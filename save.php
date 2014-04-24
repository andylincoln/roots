<?php

/*
 *  © 2014 alincoln
 *  roots
 *  save.php 
 *  Created on: Apr 23, 2014 
 */

echo $_POST["user"];
echo $_POST["treename"];

//while (array_key_exists('data', $_POST)) {
//        save();
//}

function save() {
    $tree = $_POST['data'];
    echo $tree;
//var_dump(json_decode($tree, true));
}
?>