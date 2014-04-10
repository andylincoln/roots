<?php
    include "base.php";$_SESSION = array();

    /* Save the state of the tree by copying the temp to the final location*/
    /*  $:cp /tmp/USERNAME.json json/ */
    exec('cp /tmp/' . $username . '.json' . 'json/');
    
    session_destroy(); 
?>
<meta http-equiv="refresh" content="0;index.php">