/*
    Created on  : Feb 27 2014
    Author      : Daniel Kolsoi
    Description : Script handling the detail panels.
*/

function DetailPanel(id) {
    function show(personData) {
        $('#' + id).show();

        // You can now load the data to the detail panel here, Andy.
        // personData is a person class, Be sure to find out if JavaSript uses deep or shallow copy by default.

    }

    function hide() {
        $('#' + id).hide();
    }

    // Hide the detail panel initially:
    hide();
    return {
        show: show,
        hide: hide
    };
}