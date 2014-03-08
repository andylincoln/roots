/*
    Created on  : Jan 26 2014
    Author      : Daniel Kolsoi
    Description : Script for the canvas functions.
*/

var deleteImg = new Image();
deleteImg.src = "css/img/deleteicon.svg"; // Image from http://all-free-download.com/free-vector/vector-clip-art/delete_icon_55564.html

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

    layer.add(kineticOBJ);

    var deleteIcon = new Kinetic.Image({
        x: x + 40,
        y: y - 40,
        image: deleteImg,
        width: 16,
        height: 16,
        visible: false
    });

    layer.add(deleteIcon);
    layer.draw();

    // For when the node is de/selected
    function select() {
        kineticOBJ.fill("green");
        kineticOBJ.stroke("#003300");
        deleteIcon.visible(true);
    }

    function deselect() {
        kineticOBJ.fill("gray");
        kineticOBJ.stroke("black");
        deleteIcon.visible(false);
    }

    // Have to remove the KineticJS objects their own way
    function destroy() {
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

    // Allow public access to these functions
    return {
        deselect: deselect,
        destroy: destroy,
        getData: getData,
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
    var scroll = {x: 0, y: 0},
        selections = {left: null, right: null},
        nodes = [];

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

        var pos, pythag;

        // Create a node if placed in open space:
        for (var i = 0; i < nodes.length; i++) {
            pos = nodes[i].getPosition();

            // Ignore node if offscreen:
            if (pos.x < scroll.x || pos.y < scroll.y ||
                pos.x > $(id).width() + scroll.x ||
                pos.y > $(id).height() + scroll.y) {
                
                continue;
            }
            
            pythag = Math.pow((x - pos.x), 2) + Math.pow((y - pos.y), 2); // x^2 + y^2:
            // Node was selected.
            if (pythag < 1600) { // radius of 40^2 = 1600
                switch (event.which) {
                    case 1: // Left mouse
                        if (selections.left == nodes[i]) { // For future: Do not deselect if the detail panel is checked to stay open
                            selections.left = null;
                            nodes[i].deselect();
                            leftDetailWorkspace.hide();
                        }
                        else {
                            if (selections.left != null)
                                selections.left.deselect();

                            selections.left = nodes[i];
                            nodes[i].select();
                            leftDetailWorkspace.show(nodes[i].getData());
                        }

                        $(window).resize();
                        return;
                    case 2: // Middle mouse

                    case 3: // Right Mouse
                        return;
                    default:
                        break;
                }
            }
            // Tried placing a new node onto an existing node:
            else if (pythag < 7056) { // (2*radius of 80 + small offset)^2 = 7056
                // Check if the delete button was pressed:
                var pythag2 = Math.pow(x - (pos.x + 48), 2) + Math.pow(y - (pos.y - 32), 2);
                if (pythag2 < 81) {
                    removeNode(i);
                }

                // Stop a node from being created:
                return;
            }
        }
        switch (event.which) {
            case 3: // Right mouse
                var node = Node(layer, x, y);
                nodes.push(node);
                //redrawBuffer = true;

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