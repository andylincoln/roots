/*
    Created on  : Feb 27 2014
    Author      : Daniel Kolsoi
    Description : Script handling the detail panels.
*/

function DetailPanelWorkspace(id) {
    function show(personData) {
        // You can now load the data to the detail panel here, Andy.
        // personData is a person class, Be sure to find out if JavaSript uses deep or shallow copy by default.

        $(id).show();
    }

    function hide() {
        $(id).hide();
    }

    // Hide the detail panel initially:
    hide();

    // Allow access to the hide and show functions:
    return {
        show: show,
        hide: hide
    };
}