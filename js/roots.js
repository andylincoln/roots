/*
    Created on  : Feb 18 2014
    Author      : Daniel Kolsoi
    Description : Main script for roots web app.
*/

// Define our primary workspaces globally:
var canvasWorkspace,
    leftDetailWorkspace,
    rightDetailWorkspace;

$(document).ready(function(){
    // Instantiate the canvas workspace "class":
    canvasWorkspace = CanvasWorkspace("workspace");
    canvasWorkspace.animate();

    // Disable right click:
    $("#workspace").bind("contextmenu", function(e) {
        return false;
    });

    // Add an event handler to resize the canvas workspace on window resize:
    $(window).resize(function() {
        var width = window.innerWidth;
        var height = window.innerHeight - $("#topDiv").height();

        if ($("#leftDetail").css("display") != "none") {
            width -= $("#leftDetail").width();
        }

        if ($("#rightDetail").css("display") != "none") {
            width -= $("#rightDetail").width();
        }

        canvasWorkspace.resize(width, height);
    });

    // Instantiate the left detail panel "class":
    leftDetailWorkspace = DetailPanel("leftDetail");

    // Resize the window once all workspaces have been loaded.
    $(window).resize();
});