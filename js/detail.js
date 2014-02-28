/*
 Created on  : Feb 27 2014
 Author      : Daniel Kolsoi
 Description : Script handling the detail panels.
 */

function DetailPanelWorkspace(id) {

    if (!(typeof id === "string")) {
        throw Exception("DetailPanelWorkspace expects type: string");
    }

    /*
     * Panel Strings
     * 
     * The panel may be left or right, so DetailPanelWorkspace runs a check
     * for which side it is on using strLeft and strRight
     * 
     */
    var strLeft = "#left", strRight = "#right", idPrefix = null;

    if (id.indexOf(strLeft) === 0) {
        idPrefix = strLeft;
    } else if (id.indexOf(strRight) === 0) {
        idPrefix = strRight;
    } else {
        throw("DetailPanelWorkspace: Invalid ID");
    }

    /*
     * JS handles for UI elements in detail panel
     */
    var birthplaceInput,
            dateBirthInput,
            dateDeathInput,
            firstNameInput,
            genderSelect,
            generationInput,
            lastNameInput,
            middleNameInput,
            residenceInput;

    birthplaceInput = $(idPrefix + "Birthplace");
    dateBirthInput = $(idPrefix + "DateBirth");
    dateDeathInput = $(idPrefix + "DateDeath");
    firstNameInput = $(idPrefix + "FirstName");
    genderSelect = $(idPrefix + "Gender");
    generationInput = $(idPrefix + "Generation");
    lastNameInput = $(idPrefix + "LastName");
    middleNameInput = $(idPrefix + "MiddleName");
    residenceInput = $(idPrefix + "Residence");


    function show(personData) {
        // You can now load the data to the detail panel here, Andy.
        // personData is a person class, Be sure to find out if JavaSript uses deep or shallow copy by default.

        birthplaceInput.val(personData.getBirthplace());
        //TODO fill the inputs with the rest of the data
        $(id).show();
    }

    function hide() {
        $(id).hide();
    }

    // Hide the detail panel initially:
    hide();

    // Allow access to the hide and show functions:
    return {
        hide: hide,
        show: show
    };
}