/*
 Created on  : Feb 18 2014
 Author      : Daniel Kolsoi
 Description : Main script for roots web app.
 */

// Define our primary workspaces globally:
var canvasWorkspace,
    leftDetailWorkspace,
    rightDetailWorkspace,
    tutorialStage = 0;

function save() {
    
    var tree = {
        user  : username,
        nodes : []
    };
    
    for(var i = 0; i < nodes.length; i++) {
        tree.nodes.push(nodes[i].getData().getJSOL());
    }
    console.log(JSON.stringify(tree));
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

    $("#tutorialButton").tooltipster({
        content: "Click here to start the tutorial. You will be taught the basics of using Roots.",
        position: "left"
    });

    $("#workspace").tooltipster({
        content: "This is where you will be creating your family tree. Right click in here to create a visual representation of a person.",
        position: "top",
        trigger: "custom"
    });

    $("#leftSave").tooltipster({
        content: "Fill out your name at least and press save. You can update this information later.",
        position: "bottom",
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
    $("#tutorialButton").click(function(){
        // Start Tutorial
        tutorialStage = 1;

        // switch the tooltip in use:
        $("#tutorialButton").tooltipster("hide");
        $("#workspace").tooltipster("show");

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