/*
    Created on  : Jan 26 2014
    Author      : Daniel Kolsoi
    Description : Test script for the canvas demo.
*/

function Node() {
	var person = "Person";// = Person("Person");	

	return {
		// more stuff
	};
}

function Canvas(id) {
	// Load data required to manipulate the canvas:
	var cElement = document.getElementById(id),
		context = cElement.getContext("2d"),
		scroll = {x: 0, y: 0},
		jID = '#' + id,
		nodes = [];

	// This is the function that will draw to the canvas each frame:
	function draw() {
		// if scrolling, shift scrolled ver of back buffer onto front:
		// --- not handled in the demo ---


		// if new stuff to be drawn, draw to back buffer
		// Start by clearing the screen:
		context.clearRect(0, 0, cElement.width, cElement.height);

		// Draw nodes and connections:
		context.stroke();

		// Draw back buffer onto front buffer:

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
		context.canvas.width  = width;
		context.canvas.height = height;

		tiles.x = Math.ceil(width / tileSize);
		tiles.y = Math.ceil(height/ tileSize);
	}

	// This function will handle the drawing and fps syncing:
	function animate() {
		var time = 0,
			inc = 0.1;

		// Immediate Anonymous Loop:
		(function loop() {
			requestAnimationFrame(loop);
			time += inc;
			draw();
		}());
	}

	// Handle the canvas being clicked:
	 $(jID).click(function(e){
	 	// x & y based on code from https://stackoverflow.com/questions/3067691/html5-canvas-click-event:
	    var x = Math.floor((e.pageX-$(jID).offset().left) / tileSize);
	    var y = Math.floor((e.pageY-$(jID).offset().top)  / tileSize);

	    // Create a node if placed in open space:
	    if (true) { // figure out way to map nodes, check if not occupied already.
	    	var node = Node();
	    	nodes.push(node);
	    }

	    // Needs to be moved out of this function:
    	//context.fillStyle = "rgb(255,0,0)";
    	//context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
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