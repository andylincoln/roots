<?php include "base.php";?>
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
        <link rel="shortcut icon" href="favicon.ico" />
        <!-- Include the jQuery library & jQuery based plugins -->
        <link rel="stylesheet" type="text/css" href="css/tooltipster.css" />
        <script type="text/javascript" src="lib/jquery2.1.0/jquery-2.1.0.min.js"></script>
        <script type="text/javascript" src="lib/jquery2.1.0/jquery.cookie.js"></script>
        <script type="text/javascript" src="lib/jquery2.1.0/jquery.tooltipster.min.js"></script>

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

        <script>
            var username = "<?php echo $_SESSION['Username'] ?>";
            load(username);
        </script>

        <!-- Include Google Fonts -->
        <link href='http://fonts.googleapis.com/css?family=Port+Lligat+Slab|Roboto:400,500,700' rel='stylesheet' type='text/css'>
    </head>

    <body>

        <?php
        // Check if logged in, if not redirect to login
        if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['Username'])) {
            $username = $_SESSION['Username'];
            ?>

            <!-- This is for the main bar at the top of the page  -->
            <header>
                <div id="logo" class="wrapper">
                    <img src="css/img/roots-logo-small.png" style="float:left;"> 
                </div>

                <div id="accountLinks">
                    <ul>
                        <li><a href="" id="tutorialButton">Tutorial</a></li>
                        <li><a id="logout" href="logout.php" >Log Out</a></li>
                    </ul>
                </div>
            </header>

            <aside id ="aside">
                <!--Tree Title-->
                <input id="title" placeholder="Tree Title">
                <!-- This is for the left detail panel. -->

                <div id="leftDetail" class="details">

                    <div class="buttonWrapper">
                        <div style="float:right; padding-top:5px; padding-bottom: 5px; padding-right: 10px;">
                            <input id="leftCheckEdit" type="checkbox" class="small-button" checked> <label for="leftCheckEdit" class="small-button">Edit</label>
                        </div>
                    </div>
                    <div id="nameWrapper" class="line">
                        <input id="leftFirstName"   placeholder="First"     size="8" class="edit text displayText">
                        <input id="leftMiddleName"  placeholder="Middle"    size="8" class="edit text displayText">
                        <input id="leftLastName"    placeholder="Last"      size="8" class="edit text displayText">
                        <input id="leftSuffix"      placeholder="Suffix"    size="3" class="edit text displayText">
                    </div>

                    <table>
                        <tr>
                            <td><label for="leftDateBirth">Born</label></td>
                            <td>
                                <input id="leftCheckLiving" type="checkbox" class="small-button" checked>
                                <label for="leftCheckLiving" class="small-button">Living?</label>
                            </td>
                        </tr>
                        <tr>
                            <td><img src="css/img/calendar.png" class="icon"></td>
                            <td><input id="leftDateBirth" placeholder="Born" type="date" size="6" class="date text displayText"></td>
                        </tr>
                        <tr id="deathLabel">
                            <td><label for="leftDateDeath">Died</label></td>
                        </tr>
                        <tr id="deathInput">
                            <td><img src="css/img/calendar.png" class="icon"></td>
                            <td><input id="leftDateDeath" placeholder="Died" type="date" size="6" class="date text displayText"></td>
                        </tr>
                        <tr>
                            <td><img src="css/img/gender.png" class="icon"></td>
                            <td>
                                <select id="leftGender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><img src="css/img/generation.png" class="icon"></td>
                            <td><input id="leftGeneration"  placeholder="Generation" size="2" type="number" name="generation" min="1" class="edit text displayText"></td>
                        </tr>
                        <tr>
                            <td><img src="css/img/birthplace.png" class="icon"></td>
                            <td><input id="leftBirthplace"  placeholder="Birthplace" class="edit text displayText"></td>
                        </tr>
                        <tr>
                            <td><img src="css/img/residence.png" class="icon"></td>
                            <td><input id="leftResidence"  placeholder="Residence" class="edit text displayText"></td>
                        </tr>
                    </table>
                    <div class="buttonWrapper">
                        <div style="float:right; padding-top:5px; padding-bottom: 5px; padding-right: 10px;">
                            <button id="leftSave" class="small-button">Save</button>
                        </div>
                    </div>
                </div>
            </aside>

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