/*
 Created on  : Feb 18 2014
 Author      : Daniel Kolsoi
 Description : Main script for roots web app.
 */

// Define our primary workspaces globally:
var canvasWorkspace,
    leftDetailWorkspace,
    rightDetailWorkspace;

var tutorialTooltip = $("#tutorialButton");

tutorialTooltip.tooltip({
    show: {
        effect: "slideDown",
        delay: 250
    }
});

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

    // Enable the tutorial tooltip if first time on page
    if ($.cookie("visited") != "true")
        // Does not work:
        tutorialTooltip.tooltip("open");

    // Commented out for testing:
    //$.cookie("visited", "true", { expires: 365 });

    // Disable default url click functionality on tutorial button
    $("#tutorialButton").click(function(){
        // Start Tutorial

        return false;
    });

    // Instantiate the left detail panel "class":
    leftDetailWorkspace = DetailPanelWorkspace("#leftDetail");
    rightDetailWorkspace= DetailPanelWorkspace("#rightDetail");

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
        $("#deathLabel").children().toggle();
        $("#deathInput").children().toggle();
    });

    // Resize the window once all workspaces have been loaded.    
    $(window).resize();
});