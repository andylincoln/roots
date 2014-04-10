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


function save() {
    
    var tree = {
        user  : username,
        treename: $("#title").val(),
        nodes : []
    };
    
    for(var i = 0; i < nodes.length; i++) {
        tree.nodes.push(nodes[i].getData().getJSOL());
    }
    
    $.ajax({
        type: "post",
        url: "roots.php",
        data: JSON.stringify(tree)
//        ,success: function(){ console.log("AJAX call: Successfully saved!");}
    });
    // for debugging
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