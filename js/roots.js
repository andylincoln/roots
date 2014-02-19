/*
	Created on  : Feb 18 2014
	Author      : Daniel Kolsoi
	Description : Main script for roots web app.
*/

$(document).ready(function(){
	// Instantiate the canvas "class":
	var canvas = Canvas("canvas");
	canvas.animate();

	// Resize the canvas initially, and do the same upon window resize:
	$(window).resize(function() {
		var width = window.innerWidth;
		var height = window.innerHeight - $("#topDiv").height();
		
		if ($("#leftDetail").css("display") == "inline-block") {
			width -= $("#leftDetail").width();
		}

		if ($("#rightDetail").css("display") == "inline-block") {
			width -= $("#rightDetail").width();
		}

		canvas.resize(width, height);
	});
	$(window).resize();
});