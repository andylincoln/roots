<?php include "base.php"?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <!--
                Created on  : Jan 26 2014
                Author      : Daniel Kolsoi
                Description : Main roots website page.
        -->

        <title>Roots Family Tree</title>

        <!-- Include the jQuery library -->
        <script type="text/javascript" src="lib/jquery2.1.0/jquery-2.1.0.min.js"></script>
        
        <!-- Include the jQueryUI library  & it's CSS Theme-->
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
        
        <!-- Include the KineticJS library -->
        <script src="http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v5.0.1.min.js"></script>

        <!-- Include main roots script and css -->
        <script type="text/javascript" src="js/roots.js"></script>
        <link rel="stylesheet" href="css/roots.css">

        <!-- Include our canvas library -->
        <script type="text/javascript" src="js/canvas.js"></script>

        <!-- Include our person library -->
        <script type="text/javascript" src="js/person.js"></script>

        <!-- Include our detail library -->
        <script type="text/javascript" src="js/detail.js"></script>

        <!-- Include Google Fonts -->
        <link href='http://fonts.googleapis.com/css?family=Port+Lligat+Slab|Roboto:400,500,700' rel='stylesheet' type='text/css'>
    </head>

    
    <body>
        
        <?php #Check if logged in, if not redirect to login
        if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) {
        ?>
        
        <!-- This is for the main bar at the top of the page  -->
        <header>
            <div id="logo" class="wrapper">
                <img src="css/img/roots-logo-small.png" style="float:left;"> 
            </div>

            <div id="accountLinks">
                <ul>
                    <li><a href="logout.php">Log Out</a></li>
                </ul>
            </div>
        </header>

        <!-- This is for the left detail panel. -->
        <div id="leftDetail">
            <!--Tree Title-->
            <h1 id="title">Untitled</h1>
            <div class="details">
                <div>
                    <input id="checkEdit" type="checkbox" checked>
                    <table>
                        <tr>
                            <td><input id="leftFirstName" placeholder="First" size="8" class="edit text displayText"></td>
                            <td><input id="leftMiddleName" placeholder="Middle" size="8" class="edit text displayText"></td>
                            <td><input id="leftLastName" placeholder="Last" size="8" class="edit text displayText"></td>
                        </tr>
                        <tr>
                            <td><input id="leftDateBirth" placeholder="01/01/00" size="8" class="date text displayText"></td>
                            <td><p style="text-align: center" class="text">-</p></td>
                            <td><input id="leftDateDeath" placeholder="01/01/00" size="8" class="date text displayText"></td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <td><label for="leftGender">Gender:</label></td>
                            <td>
                                <select id="leftGender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="leftBirthplace">Birthplace:</label></td>
                            <td><input id="leftBirthplace" class="edit text displayText"></td>
                        </tr>
                        <tr>
                            <td><label for="leftResidence">Residence:</label></td>
                            <td> <input id="leftResidence" class="edit text displayText"></td>
                        </tr>
                        <tr>
                            <td><label for="leftGeneration">Generation:</label></td>
                            <td><input id="leftGeneration" size="2" class="edit text displayText"></td>
                        </tr>
                    </table>
                    <div><button id="leftSave" class="small-button">Save</button></div>
                </div>
            </div>
        </div>

        <div id="workspace"> 

        </div>

        <!-- This is for the right detail panel. -->
        <div id="rightDetail">

        </div>
        <?php
        } else {
            echo "<script>window.location = 'index.php'</script>";
        }
        ?>
    </body>
</html>