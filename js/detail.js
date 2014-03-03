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
     * The panel may be left or right, so DetailPanelWorkspace runs a check
     * for which side it is on using strLeft and strRight
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
     * jQuery object handles for UI elements in detail panel
     */
    var birthplaceInput,
            dateOfBirthInput,
            dateOfDeathInput,
            firstNameInput,
            genderSelect,
            generationInput,
            lastNameInput,
            middleNameInput,
            residenceInput;

    birthplaceInput = $(idPrefix + "Birthplace");
    dateOfBirthInput = $(idPrefix + "DateBirth");
    dateOfDeathInput = $(idPrefix + "DateDeath");
    firstNameInput = $(idPrefix + "FirstName");
    genderSelect = $(idPrefix + "Gender");
    generationInput = $(idPrefix + "Generation");
    lastNameInput = $(idPrefix + "LastName");
    middleNameInput = $(idPrefix + "MiddleName");
    residenceInput = $(idPrefix + "Residence");
    
    //Default to disabled
    disable();
    
    //  Set jQueryUI Widgets in detail panel
    dateOfBirthInput.datepicker();
    dateOfDeathInput.datepicker();
    
    function disable() {
        birthplaceInput.prop( "disabled", true );
        dateOfBirthInput.prop( "disabled", true );
        dateOfDeathInput.prop( "disabled", true );
        firstNameInput.prop( "disabled", true );
        genderSelect.prop( "disabled", true );
        generationInput.prop( "disabled", true );
        lastNameInput.prop( "disabled", true );
        middleNameInput.prop( "disabled", true );
        residenceInput.prop( "disabled", true );
    }

    function enable() {
        birthplaceInput.prop( "disabled", false );
        dateOfBirthInput.prop( "disabled", false );
        dateOfDeathInput.prop( "disabled", false );
        firstNameInput.prop( "disabled", false );
        genderSelect.prop( "disabled", false );
        generationInput.prop( "disabled", false );
        lastNameInput.prop( "disabled", false );
        middleNameInput.prop( "disabled", false );
        residenceInput.prop( "disabled", false );
    }

    function hide() {
        $(id).hide();
    }

    function load(personData) {

        birthplaceInput.val(personData.getBirthplace());
        dateOfBirthInput.val(personData.getDateOfBirth());
        dateOfDeathInput.val(personData.getDateOfDeath());
        firstNameInput.val(personData.getFirstName());
        genderSelect.val(personData.getGender());
//        generationInput.val(personData.getGeneration());
        lastNameInput.val(personData.getLastName());
        middleNameInput.val(personData.getMiddleName());
        residenceInput.val(personData.getResidence());

    }

    function save(personData) {

        personData.setBirthplace(birthplaceInput.val());
        personData.setDateOfBirth(dateOfBirthInput.val());
        personData.setDateOfDeatth(dateOfDeathInput.val());
        personData.setFirstName(firstNameInput.val());
        personData.setGender(genderSelect.val());
//        personData.set(generationInput.val());
        personData.setLastName(lastNameInput.val());
        personData.setMiddleName(residenceInput.val());
        personData.setResidenceInput(personData.getResidence());

    }

    function show(personData) {
        load(personData);
        $(id).show();
    }

    // Hide the detail panel initially:
    hide();

    // Allow external access to functions:
    return {
        disable: disable,
        enable: enable,
        hide: hide,
        load: load,
        save: save,
        show: show
    };
}