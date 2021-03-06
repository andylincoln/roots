/*
 Created on  : Jan 26 2014
 Author      : Daniel Kolsoi
 Description : Script for the canvas functions.
 */

// list of spouces, children

var deleteImg = new Image();
deleteImg.src = "css/img/deleteicon.png"; // Image from http://all-free-download.com/free-vector/vector-clip-art/delete_icon_55564.html

var selections = {left: null, right: null};
var nodes = [];

// To hold the nodes are attempting to connect
var connection = {start: null, end: null};

// This is the connection the user manipulates
var mouseConnection;

var connectionDialog = $(
        "<div id='connectionDialog'> <p id='person1'></p> is the " +
        "<select id='relation'>" +
        "<option value='Parent'>Parent</option>" +
        "<option value='Child'>Child</option>" +
        "<option value='Spouse'>Spouse</option>" +
        "</select>" +
        " of <p id='person2'></p>" +
        "</div>");

function Connection(layer, points) {
    var connectionObj = new Kinetic.Line({
        points: points,
        stroke: "#8b4424",
        strokeWidth: 5,
        lineCap: "round",
        lineJoin: "round",
        dash: [10, 10]
    });

    function setPoints(points) {
        connectionObj.points(points);
        layer.draw();
    }

    function setColor(color) {
        connectionObj.stroke(color);
        layer.draw();
    }

    function getPoints() {
        return connectionObj.points();
    }

    function destroy() {
        connectionObj.destroy();
    }

    layer.add(connectionObj);

    return {
        destroy: destroy,
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

// checks to see if two children have both of the same parents
function sameParents(childA, childB) {
    var count = 0;

    for (var i = 0; i < childA.getParents().length; i++) {
        for (var j = 0; j < childB.getParents().length; j++) {
            if (childA.getParents()[i] = childB.getParents()[j]) {
                count++;
            }
        }
    }

    // count == 2 means only one mutual parent
    return (count == 4);
}

function Node(layer, x, y) {
    var data = Person(),
            selected = false,
            moved = false,
            parents = [],
            children = [],
            spouses = [],
            position = {x: x, y: y};

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
        if (event.which != 1) {
            return;
        }

        // Select or deselect
        if (circleObj.fill() == "green") {
            selections.left = null;
            deselect();

            // For tutorial only:
            if (tutorialStage == 2) {
                $("#workspace").tooltipster("show");
                $("#leftSave").tooltipster("hide");
            }
        }
        else {
            if (selections.left != null) {
                selections.left.deselect();
            }

            selections.left = findNode(circleObj);
            select();

            // For tutorial only:
            if (tutorialStage == 2) {
                $("#workspace").tooltipster("hide");
                $("#leftSave").tooltipster("show");
            }
        }
        // Update the canvas
        layer.draw();
    });

    circleObj.on("mousedown", function(event) {
        // On left click
        if (event.which == 1) {
            if (data.getName() == "null null") {
                // Error message here? No name associated with this node.
                return;
            }

            // Start connection tracking:
            connection.start = findNode(circleObj);
            mouseConnection.setPoints([x, y]);

            layer.draw();
        }
    });

    circleObj.on("mouseup", function(event) {
        // On left click
        if (event.which == 1) {
            if (data.getName() == "null null") {
                // Error message here? No name associated with this node.
                return;
            }

            // Finish connection tracking:
            if (connection.start != null && connection.start != findNode(circleObj)) {
                var points = mouseConnection.getPoints().splice(0, 2);
                var person1, person2;

                mouseConnection.setPoints(points.concat(x, y));
                connection.end = findNode(circleObj);

                person1 = connection.start.getData().getName();
                person2 = data.getName();

                // update the form UI and display its dialog
                $("#person1").text(person1);
                $("#person2").text(person2);

                connectionDialog.dialog("open");

                // Tutorial only:
                if (tutorialStage == 4) {
                    tutorialStage++;

                    $("#workspace").tooltipster("hide");
                    $("#person1").tooltipster("content", "Set yourself as the child of your parent and press accept.");
                    $("#person1").tooltipster("show");
                }
            }
            // bugfix: so the connection must be dragged off the first node:
            else {
                connection.start = null;
            }

            layer.draw();
        }
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
            deleteConnections();
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
        var charArray;

        // Get the initials via regex and format to string
        charArray = nameString.match(/\b(\w)/g);

        nameString = "";

        if (charArray != null) {
            for (var i = 0; i < charArray.length; i++) {
                nameString += charArray[i] + ". ";
            }
        }

        textObj.text(nameString);

        // Adjust text position based on string length
        textObj.x(position.x - nameString.length * 2);
        textObj.y(position.y - 5);

        layer.draw();
    }

    function getFullName() {
        return data.getName();
    }

    function addParent(parentNode) {
        // Check to see if node already is a parent
        for (var i = 0; i < parents.length; i++) {
            if (parents[i] == parentNode) {
                return;
            }
        }

        // Allowed only two parents
        if (parents.length < 2) {
            parents.push(parentNode);
            data.setParent(parentNode.getFullName());
            parentNode.addChild(findNode(circleObj));
        }
    }
    
    function removeParent(id) {
        var index = findIDinArray(id, parents);
        if (index != -1) {
            parents.splice(index, 1);
        }
    }

    function addChild(childNode) {
        // Allow only two children for graphing convenience
        if (children.length < 2) {
            data.setChildren(childNode.getFullName());
            children.push(childNode);
        }
    }

    function removeChild(id) {
        var index = findIDinArray(id, children);
        if (index != -1) {
            children.splice(index, 1);
        }
    }
        
    function addSpouse(spouseNode) {
        // Check to see if node already is a spouse
        for (var i = 0; i < spouses.length; i++) {
            if (spouses[i] == spouseNode) {
                return;
            }
        }

        // Allowed only two spouses, due to limitations on how to draw
        // more than one former spouse/partner.
        if (spouses.length < 2 && spouseNode.getSpouses().length < 2) {
            data.setSpouse(spouseNode.getFullName());
            spouses.push(spouseNode);
            spouseNode.addSpouse(findNode(circleObj));
        }
    }

    function removeSpouse(id) {
        var index = findIDinArray(id, spouses);
        if (index != -1) {
            spouses.splice(index, 1);
        }
    }

    function deleteConnections() {
        
        // ID of the node to be deleted
        var id = data.getID();
        
        // Delete any connections that have this location
        var x  = getPosition().x;
        var y  = getPosition().y;
        var connections = canvasWorkspace.getConnections();
        
        for (var i = 0; i < connections.length; i++) {
            if ((connections[i].getPoints().indexOf(x) != -1) && (connections[i].getPoints().indexOf(y) != -1)) {
                connections[i].destroy();
            }
        }
        
        // Delete references to this node in any parent
        for (var i = 0; i < parents.length; i++) {
            parents[i].removeChild(id);
        }
        
        // Delete references to this node in any child
        for (var i = 0; i < children.length; i++) {
            children[i].removeParent(id);
        }

        // Delete references to this node in any spouse
        for (var i = 0; i < spouses.length; i++) {
            spouses[i].removeSpouse(id);
        }
        
        // Delete from Global nodes
        var index = findIDinArray(id, nodes);
       
        if (index != -1) {
            nodes.splice(index, 1);
        }
        
    }

    function getChildren() {
        return children;
    }

    function getParents() {
        return parents;
    }

    function getSpouses() {
        return spouses;
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
    
    /**
     * @param {Number} id - the ID of the Person being removed
     * @param {Person[]} arr - The array of persons being searched
     * @returns {Number} - Returns index of the matching person, otherwise -1
     */
    function findIDinArray(id, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getData().getID() === id) {
                return i;
            }
        }
        return -1;
    }

    function setMoved(value) {
        moved = value;
    }

    function getMoved() {
        return moved;
    }

    function getData() {
        return data;
    }

    /**
     * 
     * @param {JSON object} savedData
     * 
     * Passes to the Person.loadData() function to fill in the person's details
     */
    function setData(savedData) {
        data.loadData(savedData);
	
	setPosition(savedData.position.x, savedData.position.y);
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

        position = {x: x, y: y};
        updateText();

        deleteObj.x(x + 40);
        deleteObj.y(y - 40);

	data.setPosition(x, y);

        layer.draw();
    }

    function getCircleObj() {
        return circleObj;
    }

    // Allow public access to these functions
    return {
        addChild: addChild,
        addParent: addParent,
        addSpouse: addSpouse,
        deselect: deselect,
        destroy: destroy,
        getData: getData,
        getCircleObj: getCircleObj,
        getChildren: getChildren,
        getFullName: getFullName,
        getMoved: getMoved,
        getParents: getParents,
        getPosition: getPosition,
        getSpouses: getSpouses,
        removeChild: removeChild,
        removeParent : removeParent,
        removeSpouse : removeSpouse,
        setData: setData,
        setMoved: setMoved,
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
    var mainLayer = new Kinetic.Layer();
    var connectionLayer = new Kinetic.Layer();

    // Flag variables:
    var redrawBuffer = false,
            scrolling = false;

    // Data Structure variables:
    var scroll = {x: 0, y: 0};
    var connections = [];

    function getMainLayer() {
        return mainLayer;
    }
    
    function getConnections() {
        return connections;
    }

    mouseConnection = Connection(connectionLayer, [0, 0]);

    connectionDialog.dialog({
        resizable: false,
        modal: true,
        hide: false,
        buttons: {
            "Accept": function() {
                // Clear current connection lines
                for (var i = 0; i < connections.length; i++)
                    connections[i].destroy();

                connections = [];

                for (var i = 0; i < nodes.length; i++)
                    nodes[i].setMoved(false);



                // Define connections based on the form input and reposition a node
                switch ($("#relation").val()) {
                    case "Parent":
                        connection.end.addParent(connection.start);
                        connection.start.setPosition($("#workspace").width() / 2, $("#workspace").height() / 2);

                        reposition(connection.start);
                        break;

                    case "Child":
                        connection.start.addParent(connection.end);
                        connection.end.setPosition($("#workspace").width() / 2, $("#workspace").height() / 2);

                        reposition(connection.end);
                        break;

                    case "Spouse":
                        connection.start.addSpouse(connection.end);
                        connection.end.addSpouse(connection.start);
                        connection.start.setPosition($("#workspace").width() / 2, $("#workspace").height() / 2);

                        reposition(connection.start);
                        break;

                    default:
                        break;
                }

                // Might have to loop through all nodes, reposition any not moved nodes

                connection.start = null;
                connection.end = null;
                mouseConnection.setPoints([0, 0]);
                $(this).dialog("close");

                // Tutorial only
                if (tutorialStage == 5) {
                    tutorialStage++;

                    // Switch tooltips, update canvas tooltip
                    $("#person1").tooltipster("hide");
                    $("#workspace").tooltipster("content", "Tutorial complete. Repeat this process to continue building your family tree!");
                    $("#workspace").tooltipster("show");
                    setTimeout(function() {
                        $("#workspace").tooltipster("hide");
                    }, 3500);
                }
            }
        },
        close: function() {
            connection.start = null;
            connection.end = null;
            mouseConnection.setPoints([0, 0]);
            $(this).dialog("close");
        }
    });

    connectionDialog.dialog("close");

    function scroll(xVelocity, yVelocity) {
        // not final nor essential:
        scroll.x += xVelocity;
        scroll.y += yVelocity;
    }

    // Repositions all nodes and connections on the canvas
    function reposition(node) {
        var pos, spouse, directFamily, offset = 0;

        node.setMoved(true);
        pos = node.getPosition();

        var children = node.getChildren(),
                parents;

        // bugfix: spousify two people with mutual children
        for (var i = 0; i < children.length; i++) {
            parents = children[i].getParents();

            if (parents.length == 2) {
                if (parents[0] != node) {
                    node.addSpouse(parents[0]);
                }
                else if (parents[1] != node) {
                    node.addSpouse(parents[1]);
                }
            }
        }

        // Position spouses horizontally
        for (var i = 0; i < node.getSpouses().length; i++) {
            spouse = node.getSpouses()[i];

            // if the spouse hasnt already been repositioned

            // Take into account number of children with this spouse
            if (spouse.getMoved() == false) {
                spouse.setPosition(pos.x + 300 * (i - offset) - 150, pos.y);

                connections.push(Connection(connectionLayer, [pos.x, pos.y, pos.x + 300 * (i - offset) - 150, pos.y]));
            }
            else {
                offset = 1;
            }
        }

        offset = 0;
        // Position children vertically according to parents positions
        for (var i = 0; i < node.getChildren().length; i++) {
            child = node.getChildren()[i];

            // if the child hasnt already been repositioned
            if (child.getMoved() == false) {
                var linePts = [pos.x, pos.y];

                if (child.getParents().length == 2) {
                    for (var j = 0; j < child.getParents().length; j++) {
                        // Found the other parent
                        if (child.getParents()[j] != node) {
                            // Figure out the offset
                            if (child.getParents()[j].getPosition().x > node.getPosition().x)
                                offset = 75;
                            else
                                offset = -75;

                            linePts = linePts.concat([pos.x + offset, pos.y]);
                        }
                    }
                }

                if (node.getChildren().length == 1) {
                    child.setPosition(pos.x + offset, pos.y + 150);
                    linePts = linePts.concat([pos.x + offset, pos.y + 150]);
                }

                else {
                    linePts = linePts.concat([pos.x + offset, pos.y + 123]);
                }

                connections.push(Connection(connectionLayer, linePts));
            }
        }

        if (node.getChildren().length == 2) {
            if (sameParents(node.getChildren()[0], node.getChildren()[1])) {
                // I appended to the list for readability.
                var forkPts = [pos.x + offset - 50, pos.y + 209];

                forkPts = forkPts.concat([pos.x + offset - 50, pos.y + 123]);
                forkPts = forkPts.concat([pos.x + offset + 50, pos.y + 123]);
                forkPts = forkPts.concat([pos.x + offset + 50, pos.y + 228]);

                connections.push(Connection(connectionLayer, forkPts));

                if (node.getChildren()[0].getMoved() == false) {
                    node.getChildren()[0].setPosition(pos.x + offset - 50, pos.y + 209);
                }

                if (node.getChildren()[1].getMoved() == false) {
                    node.getChildren()[1].setPosition(pos.x + offset + 50, pos.y + 209);
                }
            }
            else {
                var children = node.getChildren();
                for (var i = 0; i < children.length; i++) {
                    if (children[i].getParents().length == 1 && children[i].getMoved() == false) {
                        var childPts = [pos.x, pos.y, pos.x, pos.y + 150];

                        connections.push(Connection(connectionLayer, childPts));
                        children[i].setPosition(pos.x + 10, pos.y + 150);
                    }
                }
            }
        }

        // Reposition parents
        var parents = node.getParents();

        if (parents.length == 1 && parents[0].getMoved() == false) {
            connections.push(Connection(connectionLayer, [pos.x, pos.y, pos.x, pos.y - 150]));
            parents[0].setPosition(pos.x, pos.y - 150);
        }

        // End

        // combine adjacent nodes into an array and reposition them
        directFamily = node.getSpouses().concat(node.getChildren(), node.getParents());

        for (var i = 0; i < directFamily.length; i++) {
            if (directFamily[i].getMoved() == false) {
                reposition(directFamily[i]);
            }
        }
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
        mainLayer.draw();
    }

    // Sets the width & height of the canvas:
    function resize(width, height) {
        $(id).width(width);
        $(id).height(height);

        stage.width(width);
        stage.height(height);

        mainLayer.width(width);
        mainLayer.height(height);
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

                var node = Node(mainLayer, x - scroll.x, y - scroll.y);
                nodes.push(node);

                // Tutorial only:
                if (tutorialStage == 1) {
                    tutorialStage++;

                    $("#workspace").tooltipster("content", "Let's start your family tree with yourself. Left click on the newly created person.");
                }

            default:
                break;
        }
    });

    $(id).mousemove(function(event) {
        if (connection.start != null) {
            // Relocate the connection when moving mouse
            var x = event.pageX - $(id).offset().left;
            var y = event.pageY - $(id).offset().top;
            var pos = connection.start.getPosition();

            mouseConnection.setPoints([pos.x, pos.y, x, y]);
            //mainLayer.draw();
        }
    });

    $(id).mouseup(function(event) {
        var x = event.pageX - $(id).offset().left;
        var y = event.pageY - $(id).offset().top;

        // On left click
        if (event.which == 1) {
            // Starting node selected and not over an existing node:
            if (connection.start != null && mainLayer.getIntersection({x: x, y: y}) == null) {
                connection.start = null;
                mouseConnection.setPoints([0, 0]);
                mainLayer.draw();
            }
        }
    });

    // Disable right click:
    $(id).bind("contextmenu", function(e) {
        return false;
    });

    stage.add(connectionLayer);
    stage.add(mainLayer);

    // Here is the returned JSOL which allows public access of certain functions:
    return {
        getConnections: getConnections,
        getMainLayer: getMainLayer,
        resize: resize
    };
}
