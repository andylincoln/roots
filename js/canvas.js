/*
    Created on  : Jan 26 2014
    Author      : Daniel Kolsoi
    Description : Script for the canvas functions.
*/

var deleteImg = new Image();
deleteImg.src = "css/img/deleteicon.png"; // Image from http://all-free-download.com/free-vector/vector-clip-art/delete_icon_55564.html

var selections = {left: null, right: null};
var nodes = [];

// This function returns the Node associated with a particular KOBJ
function findNode(kineticOBJ) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].getKOBJ() == kineticOBJ) {
            return nodes[i];
        }
    }
}

function Node(layer, x, y) {
    var data = Person();

    var kineticOBJ = new Kinetic.Circle({
        x: x,
        y: y,
        radius: 40,
        fill: "gray",
        stroke: "black",
        strokeWidth: 5
    });

    // When the node icon is pressed:
    kineticOBJ.on("click", function(event) {
        // On left click only
        if (event.which != 1)
            return;

        // Select or deselect
        if (kineticOBJ.fill() == "green") {
            selections.left = null;
            deselect();
        }
        else {
            if (selections.left != null)
                selections.left.deselect();

            selections.left = findNode(kineticOBJ);
            select();
        }
        // Update the canvas
        layer.draw();
    });

    layer.add(kineticOBJ);

    var deleteIcon = new Kinetic.Image({
        x: x + 40,
        y: y - 40,
        image: deleteImg,
        width: 16,
        height: 16,
        visible: false
    });

    // When the delete icon is pressed:
    deleteIcon.on("click", function(event) {
        // On left click
        if (event.which == 1)
            destroy();
            layer.draw();
    });

    layer.add(deleteIcon);
    layer.draw();

    // For when the node is de/selected
    function select() {
        kineticOBJ.fill("green");
        kineticOBJ.stroke("#003300");
        deleteIcon.visible(true);
        leftDetailWorkspace.show(data);
    }

    function deselect() {
        kineticOBJ.fill("gray");
        kineticOBJ.stroke("black");
        deleteIcon.visible(false);
        leftDetailWorkspace.hide();
    }

    // Have to remove the KineticJS objects their own way
    function destroy() {
        deselect();
        kineticOBJ.destroy();
        deleteIcon.destroy();
    }

    function getData() {
        return data;
    }

    function getPosition() {
        return {
            x: kineticOBJ.x(),
            y: kineticOBJ.y()
        };
    }

    function getKOBJ() {
        return kineticOBJ;
    }

    // Allow public access to these functions
    return {
        deselect: deselect,
        destroy: destroy,
        getData: getData,
        getKOBJ: getKOBJ,
        getPosition: getPosition,
        select: select
    };
}


function CanvasWorkspace(id) {
    // KineticJS display variables
    var stage = new Kinetic.Stage({
        container: id.substring(1)
    });
    var layer = new Kinetic.Layer();

    // Flag variables:
    var redrawBuffer = false,
        scrolling = false;

    // Data Structure variables:
    var scroll = {x: 0, y: 0};

    function scroll(xVelocity, yVelocity) {
        // not final nor essential to demo:
        scroll.x += xVelocity;
        scroll.y += yVelocity;
    }

    function removeNode(index) {
        // Remove the node from current selections:
        if (selections.left == nodes[index]) {
            selections.left = null;
        }
        if (selections.right == nodes[index]) {
            selections.right = null;
        }
        
        // Remove the node from the array and update KineticsJS:
        nodes[index].destroy();
        nodes.splice(index, 1);
        layer.draw();
    }

    // Sets the width & height of the canvas:
    function resize(width, height) {
        $(id).width(width);
        $(id).height(height);

        stage.width(width);
        stage.height(height);
    }

    // This function will return the left and right selected nodes.
    function getSelections() {
        return selections;
    }

    // Handle the canvas being clicked:
    $(id).mousedown(function(event) {
        // x & y based on code from https://stackoverflow.com/questions/3067691/html5-canvas-click-event:
        var x = event.pageX - $(id).offset().left;
        var y = event.pageY - $(id).offset().top;
        var pythag, pos;

        switch (event.which) {
            case 3: // Right mouse

                // Check for collision
                for (var i = 0; i < nodes.length; i++) {
                    pos = nodes[i].getPosition();
                    pythag = Math.pow((x - pos.x), 2) + Math.pow((y - pos.y), 2); // x^2 + y^2
                    if (pythag < 7056) {
                        return;
                    }
                }

                var node = Node(layer, x - scroll.x, y - scroll.y);
                nodes.push(node);
            default:
                break;
        }
    });

    // Disable right click:
    $(id).bind("contextmenu", function(e) {
        return false;
    });

    stage.add(layer);

    // Here is the returned JSOL which allows public access of certain functions:
    return {
        getSelections: getSelections,
        resize: resize
    };
}