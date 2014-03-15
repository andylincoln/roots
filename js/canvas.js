/*
    Created on  : Jan 26 2014
    Author      : Daniel Kolsoi
    Description : Script for the canvas functions.
*/

var deleteImg = new Image();
deleteImg.src = "css/img/deleteicon.png"; // Image from http://all-free-download.com/free-vector/vector-clip-art/delete_icon_55564.html

var selections = {left: null, right: null};
var nodes = [];

// To hold the nodes are attempting to connect
var connection = {start: null, end: null};

// This is the connection the user manipulates
var mouseConnection;

function Connection(layer, points) {
    var connectionObj = new Kinetic.Line({
        points: points,
        stroke: "#8b4424",
        strokeWidth: 5,
        lineCap: "round",
        lineJoin: "round",
        dash: [33, 10]
    });

    function setPoints(points) {
        connectionObj.points(points);
    }

    function setColor(color) {
        connectionObj.stroke(color);
    }

    function getPoints() {
        return connectionObj.points();
    }

    layer.add(connectionObj);

    return {
        getPoints: getPoints,
        setColor: setColor,
        setPoints: setPoints
    };
}
// This function returns the Node associated with a particular CircleObj
function findNode(circleObj) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].getCircleObj() == circleObj) {
            return nodes[i];
        }
    }
}

function Node(layer, x, y) {
    var data = Person();

    var circleObj = new Kinetic.Circle({
        x: x,
        y: y,
        radius: 40,
        fill: "gray",
        stroke: "black",
        strokeWidth: 5
    });

    // When the node icon is pressed:
    circleObj.on("click", function(event) {
        // On left click only
        if (event.which != 1)
            return;

        // Select or deselect
        if (circleObj.fill() == "green") {
            selections.left = null;
            deselect();
        }
        else {
            if (selections.left != null)
                selections.left.deselect();

            selections.left = findNode(circleObj);
            select();
        }
        // Update the canvas
        layer.draw();
    });

    circleObj.on("mousedown", function(event) {
        // On left click, draw the line
        if (event.which == 1) {
            connection.start = findNode(circleObj);
            mouseConnection.setPoints([x, y]);
        }

        layer.draw();
    });

    circleObj.on("mouseup", function(event) {
        // On left click
        if (event.which == 1) {
            if (connection.start != null && connection.start != findNode(circleObj)) {
                var points = mouseConnection.getPoints().splice(0, 2);

                mouseConnection.setPoints(points.concat(x, y));
                connection.end = findNode(circleObj);

                // call GUI stuff here
                alert("Gui goes here.");
            }
        }

        layer.draw();
    });

    layer.add(circleObj);

    var deleteObj = new Kinetic.Image({
        x: x + 40,
        y: y - 40,
        image: deleteImg,
        width: 16,
        height: 16,
        visible: false
    });

    // When the delete icon is pressed:
    deleteObj.on("click", function(event) {
        // On left click
        if (event.which == 1) {
            destroy();
            layer.draw();
        }
    });

    layer.add(deleteObj);

    var textObj = new Kinetic.Text({
        x: x,
        y: y,
        text: "",
        fontSize: 12,
        fontFamily: "Roboto",
        fontStyle: "Bold",
        fill: "black"
    });

    // Redirect clicking the text to clicking the node
    textObj.on("click", function(event) {
        circleObj.fire("click", event);
    });

    textObj.on("mouseup", function(event) {
        circleObj.fire("mouseup", event);
    });

    textObj.on("mousedown", function(event) {
        circleObj.fire("mousedown", event);
    });

    layer.add(textObj)
    layer.draw();

    // Update the text drawn on top of nodes
    function updateText() {
        var nameString = data.getName();
        var charArray, xAdjust, yAdjust;

        // Get the initials via regex and format to string
        charArray = nameString.match(/\b(\w)/g);

        nameString = "";
        for (var i = 0; i < charArray.length; i++) {
            nameString += charArray[i] + ". ";
        }

        textObj.text(nameString);

        // Adjust text position based on string length
        xAdjust = x - nameString.length * 2;
        yAdjust = y - 5;

        textObj.x(xAdjust);
        textObj.y(yAdjust);

        layer.draw();
    }

    // For when the node is de/selected
    function select() {
        circleObj.fill("green");
        circleObj.stroke("#003300");
        deleteObj.visible(true);

        // Pass this node off to the detail panel
        leftDetailWorkspace.show(findNode(circleObj));
    }

    function deselect() {
        circleObj.fill("gray");
        circleObj.stroke("black");
        deleteObj.visible(false);
        leftDetailWorkspace.hide();
    }

    // Have to remove the KineticJS objects their own way
    function destroy() {
        deselect();
        circleObj.destroy();
        deleteObj.destroy();
        textObj.destroy();
    }

    function getData() {
        return data;
    }

    function getPosition() {
        return {
            x: circleObj.x(),
            y: circleObj.y()
        };
    }

    function setPosition(x, y) {
        circleObj.x(x);
        circleObj.y(y);
        deleteObj.x(x + 40);
        deleteObj.y(y - 40);
    }

    function getCircleObj() {
        return circleObj;
    }

    // Allow public access to these functions
    return {
        deselect: deselect,
        destroy: destroy,
        getData: getData,
        getCircleObj: getCircleObj,
        getPosition: getPosition,
        setPosition: setPosition,
        select: select,
        updateText: updateText
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

    mouseConnection = Connection(layer, [0, 0]);

    function scroll(xVelocity, yVelocity) {
        // not final nor essential:
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

        layer.width(width);
        layer.height(height);
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
            // Right Click
            case 3:
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

    $(id).mousemove(function(event){
        if (connection.start != null) {
            
            // Relocate the connection when moving mouse
            var x = event.pageX - $(id).offset().left;
            var y = event.pageY - $(id).offset().top;
            var pos = connection.start.getPosition();

            mouseConnection.setPoints([pos.x, pos.y, x, y]);
            layer.draw();
        }
    });

    $(id).mouseup(function(event){
        var x = event.pageX - $(id).offset().left;
        var y = event.pageY - $(id).offset().top;

        switch (event.which) {
            // Left Click
            case 1:
                if (connection.start != null) {
                    connection.start = null;
                    mouseConnection.setPoints([0, 0]);
                    layer.draw();
                }
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