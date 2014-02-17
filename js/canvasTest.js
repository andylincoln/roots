/*
	Created on  : Jan 26 2014
	Author      : Daniel Kolsoi
	Description : Test script for the canvas demo.
*/

function Node(x, y) {
	// Data structure variables:
	var person = "Person";// = Person("Person");
	var pos = {x: x, y: y};

	// Flag variables:
	var selected = false;

	// Getter function(s):
	function getPosition() {
		return pos;
	}
	return {
		getPosition: getPosition
	};
}

function Canvas(id) {
	// Canvas and buffer variables:
	var mElement = document.getElementById(id),
		bElement = document.createElement('canvas'),
		mainBuffer = mElement.getContext("2d"),
		backBuffer = bElement.getContext("2d");

	// Flag variables:
	var redrawBuffer = false,
		scrolling = false;

	// Data Structure variables:
	var scroll = {x: 0, y: 0},
		selections = {left: null, right: null},
		nodes = [];

	// This is the function that will draw to the back buffer only when something new happens on screen:
	function draw() {
		var pos;

		// Start by clearing the screen:
		backBuffer.clearRect(0, 0, mElement.width, mElement.height);

		// Draw nodes and connections:
		for (var i = 0; i < nodes.length; i++) {
			pos = nodes[i].getPosition();

			backBuffer.beginPath();
			backBuffer.arc(pos.x, pos.y, 40, 2 * Math.PI, 0);
			backBuffer.fillStyle = "gray";

			// tmp, color TBD:
			if (selections.left == nodes[i] || selections.right == nodes[i])
				backBuffer.fillStyle = "green";

			backBuffer.fill();
			backBuffer.lineWidth = 5;
			backBuffer.strokeStyle = "black";

			// tmp, color TBD:
			if (selections.left == nodes[i] || selections.right == nodes[i])
				backBuffer.strokeStyle = "#003300";
			
			backBuffer.stroke();
		}
	}

	function update() {
		if (redrawBuffer) {
			draw();
		}

		// if scrolling, shift scrolled version of back buffer onto front:
		// --- scroll not tested in demo ---
		if (redrawBuffer) { // || scrolling) ?
			mainBuffer.drawImage(bElement, scroll.x, scroll.y);
			redrawBuffer = false;
		}
	}

	function scroll(xVelocity, yVelocity) {
		// not final nor essential to demo:
		scroll.x += xVelocity;
		scroll.y += yVelocity;
	}

	function resetCamera() {
		// Not sure if actually needed.
		scroll.x = 0;
		scroll.y = 0;
	}

	// Sets the width & height of the canvas:
	function resize(width, height) {
		mainBuffer.canvas.width  = width;
		mainBuffer.canvas.height = height;

		backBuffer.canvas.width  = width;
		backBuffer.canvas.height = height;

		redrawBuffer = true;
	}

	// This function will handle updating the canvas and fps syncing:
	function animate() {
		var time = 0,
			inc = 0.1;

		// Immediate Anonymous Loop:
		(function loop() {
			requestAnimationFrame(loop);
			time += inc;
			update();
		}());
	}

	// Handle the canvas being clicked:
	$('#' + id).click(function(e){
		// x & y based on code from https://stackoverflow.com/questions/3067691/html5-canvas-click-event:
		var x = e.pageX - $('#' + id).offset().left;
		var y = e.pageY - $('#' + id).offset().top;

		var pos, pythag;

		// Create a node if placed in open space:
		for (var i = 0; i < nodes.length; i++) {
			pos = nodes[i].getPosition();

			// Ignore node if offscreen:
			if (pos.x < scroll.x || pos.y < scroll.y ||
				pos.x > mainBuffer.canvas.width + scroll.x ||
				pos.y > mainBuffer.canvas.height + scroll.y) {
				
				continue;
			}
			
			pythag = Math.pow((x - pos.x), 2) + Math.pow((y - pos.y), 2); // x^2 + y^2:
			// Node was selected.
			console.log(pythag);
			if (pythag < Math.pow(40, 2)) {
				selections.left = nodes[i];
				redrawBuffer = true;
				return;
			}
			
			// Tried placing a new node onto an existing node:
			else if (pythag < Math.pow(84, 2)) // 80 is 2*radius + small border offset
				return;
		}
		
		var node = Node(x + scroll.x, y + scroll.y);
		nodes.push(node);
		redrawBuffer = true;
	});

	// Here is the returned JSOL which allows public access of certain functions:
	return {
		animate: animate,
		resize: resize
		// more stuff
	};
}


$(document).ready(function(){
	// Instantiate the canvas "class":
	var canvas = Canvas("canvas");
	canvas.animate();

	// tmp, for the demo. Although we will use similar logic:
	canvas.resize(window.innerWidth, window.innerHeight);
	$(window).resize(function() {
		canvas.resize(window.innerWidth, window.innerHeight);
	});
});