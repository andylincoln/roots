/*
    Created on  : Feb 18 2014
    Author      : Daniel Kolsoi
    Description : Main script for roots web app.
*/

$(document).ready(function(){
    //$("#leftDetail").hide();
    //$("#rightDetail").hide();


    // Instantiate the canvas "class":
    var canvasWorkspace = Workspace("workspace");
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
    // Resize the window on document load.
    $(window).resize();

    /*
        For Andy:
        1. You can get the JSOL containing the left (and right) nodes from canvas.getSelections()
            However we're only working on the left detail panel right now.
        2. Once you have a node, you can call node.getData() to return its associated person class.
            Be sure to figure out if JavaSript uses deep or shallow copy by default.
    */

});