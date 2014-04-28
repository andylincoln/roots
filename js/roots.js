/*
 Created on  : Feb 18 2014
 Author      : Daniel Kolsoi
 Description : Main script for roots web app.
 */

// Define our primary workspaces globally:
var canvasWorkspace,
        leftDetailWorkspace,
        rightDetailWorkspace,
        tutorialStage = 0,
        tutorialCheck = "";

function save() {

    var tree = {
        user: username,
        treename: $("#title").val(),
        nodes: []
    };

    for (var i = 0; i < nodes.length; i++) {
        tree.nodes.push(nodes[i].getData().getJSOL());
    }

    $.ajax({
        type: "POST",
        url: "save.php",
        dataType: "json",
        async: false,
        data: {"tree": JSON.stringify(tree)},
        success: function() {
            console.log("AJAX Save call: Successful!");
        },
        error: function() {
            console.log("AJAX Save call: Error!");
        }
    });
    // for debugging
    //    console.log(JSON.stringify(tree));
}

/**
 * 
 * @param {String} username
 * Loads the appropriate file via an AJAX call
 */
function load(username) {
    
    var dir = "json/";
    var tree = null;
    
    $.get(dir + username + '.json', function(data) {
       tree = data;
       
       // Debugging: Output the data in the file to the console 
       console.log(data);
       
      //    TODO Draw and load up the data from the AJAX call
       
    }); 
}

$(document).ready(function() {
    // Instantiate the canvas workspace "class":
    canvasWorkspace = CanvasWorkspace("#workspace");

    // Add an event handler to resize the canvas workspace on window resize:
    $(window).resize(function() {
        var width = window.innerWidth - $("#aside").width();
        var height = window.innerHeight - $("header").height();

        if ($("#rightDetail").css("display") != "none") {
            width -= $("#rightDetail").width();
        }

        // Adjust for temp borders
        width -= 4;

        canvasWorkspace.resize(width, height);
    });

    // Initiate tooltipster
    //$(".tooltipster").tooltipster();

    // Tooltip for the tutorial button
    $("#tutorialButton").tooltipster({
        content: "Click here to start the tutorial. You will be taught the basics of using Roots.",
        position: "left"
    });

    // Tooltip for the canvas
    $("#workspace").tooltipster({
        content: "This is where you will be creating your family tree. Right click in here to create a visual representation of a person.",
        position: "top",
        trigger: "custom"
    });

    // Tooltip for the save button
    $("#leftSave").tooltipster({
        content: "Fill out your name at least and press save. You can update this information later.",
        position: "bottom",
        trigger: "custom"
    });

    // Tooltip for the dialog
    $("#person1").tooltipster({
        content: "Select the child option and hit accept.",
        position: "top-left",
        trigger: "custom"
    });

    // Enable the tutorial tooltip if first time on page
    if ($.cookie("visited") != "true")
        $("#tutorialButton").tooltipster("show", function() {
            setTimeout(function() {
                $("#tutorialButton").tooltipster("hide");
            }, 3500);
        });


    // Commented out for testing:
    //$.cookie("visited", "true", { expires: 365 });

    // Disable default url click functionality on tutorial button
    $("#tutorialButton").click(function() {
        // Start Tutorial
        tutorialStage = 1;

        // switch the tooltip in use:
        $("#tutorialButton").tooltipster("hide");
        $("#workspace").tooltipster("show");

        return false;
    });

    // Instantiate the left detail panel "class":
    leftDetailWorkspace = DetailPanelWorkspace("#leftDetail");
    rightDetailWorkspace = DetailPanelWorkspace("#rightDetail");

    // Enable/Disable editing checkbox
    $("#leftCheckEdit").click(function() {
        if ($(this).is(':checked')) {
            leftDetailWorkspace.enable();
        } else {
            leftDetailWorkspace.disable();
        }
    });

    $("#leftSave").click(function() {
        leftDetailWorkspace.save();
    });

    $("#leftCheckLiving").click(function() {
        if ($("#leftCheckLiving").prop("disabled", false)) {
            $("#deathLabel").children().toggle();
            $("#deathInput").children().toggle();
        }
    });

    $("#logout").click(function() {
        save();
    });


    // Resize the window once all workspaces have been loaded.    
    $(window).resize();
    
    save(); // Save on ready state
});