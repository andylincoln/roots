/*
    Created on  : Jan 26 2014
    Author      : Daniel Kolsoi
    Description : Test script for the canvas demo.
*/

function Node() {
	// stuff

	return {
		// more stuff
	};
}

function Canvas(id) {
	// Load data required to manipulate the canvas:
	var cElement = document.getElementById(id);
	var context  = cElement.getContext("2d");

	function privateDraw() {

	}

	function privateScroll(velocity) {
		// Up / Down only scroll?
	}

	// Sets the width & height of the canvas:
	function privateResize(width, height) {
		context.canvas.width  = width;
		context.canvas.height = height;
	}

	// This function will handle the drawing and fps syncing:
	function privateAnimate() {
		var time = 0,
			inc  = 0.1;

		// Immediate Anonymous Loop:
		(function loop() {
			requestAnimationFrame(loop);
			time += inc;
			// draw();
		}());
	}

	// Here is the returned JSOL which allows public access of certain functions:
	return {
		animate: privateAnimate,
		resize:  privateResize
		// more stuff
	};
}


$(document).ready(function(){
	// Instantiate the canvas "class":
	var canvas = Canvas("canvas");
	canvas.animate();

	// Physics engine, probably scrapping
	//var world = new b2World( new b2Vec2(0.0, -10.0) );

});