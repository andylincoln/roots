/*
	Created on  : Jan 26 2014
	Author      : Daniel Kolsoi
	Description : Script for the canvas functions.
*/

$(document).ready(function(){
	// Instantiate the canvas "class":
	var canvas = Canvas("canvas");
	canvas.animate();

	/* Needs to be changed to resize to the amount of the screen
	   deemed appropriate for the canvas instead of the whole page */
	canvas.resize(window.innerWidth, window.innerHeight);
	$(window).resize(function() {
		canvas.resize(window.innerWidth, window.innerHeight);
	});
});