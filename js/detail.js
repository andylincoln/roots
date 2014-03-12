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
            currentPerson,
            dateOfBirthInput,
            dateOfDeathInput,
            firstNameInput,
            genderSelect,
            generationInput,
            lastNameInput,
            middleNameInput,
            residenceInput,
            saveButton;

    birthplaceInput = $(idPrefix + "Birthplace");
    dateOfBirthInput = $(idPrefix + "DateBirth");
    dateOfDeathInput = $(idPrefix + "DateDeath");
    firstNameInput = $(idPrefix + "FirstName");
    genderSelect = $(idPrefix + "Gender");
    generationInput = $(idPrefix + "Generation");
    lastNameInput = $(idPrefix + "LastName");
    middleNameInput = $(idPrefix + "MiddleName");
    residenceInput = $(idPrefix + "Residence");
    saveButton= $(idPrefix + "Save");
    
    //Default to enabled
    enable();
    
    //  Set jQueryUI Widgets in detail panel
    dateOfBirthInput.datepicker({
//     showOn: 'button',
//        buttonImage: '',
//        buttonImageOnly: true,
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear: true,
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(2014, 11, 31),
        defaultDate: new Date(1950, 0, 1),
        yearRange: '1900:2014'
    });
    dateOfDeathInput.datepicker({
//        showOn: 'button',
//        buttonImage: '',
//        buttonImageOnly: true,
        dateFormat: 'mm/dd/yy',
        changeMonth:true,
        changeYear: true,
        minDate: new Date(1900, 0, 1),
        maxDate: new Date(2014, 11, 31),
        defaultDate: new Date(1950, 0, 1),
        yearRange: '1900:2014'
    });
    saveButton.button();
    
    function disable() {
        //  Disable the inputs
        birthplaceInput.prop( "disabled", true );
        dateOfBirthInput.prop( "disabled", true );
        dateOfDeathInput.prop( "disabled", true );
        firstNameInput.prop( "disabled", true );
        genderSelect.prop( "disabled", true );
        generationInput.prop( "disabled", true );
        lastNameInput.prop( "disabled", true );
        middleNameInput.prop( "disabled", true );
        residenceInput.prop( "disabled", true );
        
        // Toggle the black text
        toggleDisplayText();
    }

    function enable() {
        //  Enable the inputs
        birthplaceInput.prop( "disabled", false );
        dateOfBirthInput.prop( "disabled", false );
        dateOfDeathInput.prop( "disabled", false );
        firstNameInput.prop( "disabled", false );
        genderSelect.prop( "disabled", false );
        generationInput.prop( "disabled", false );
        lastNameInput.prop( "disabled", false );
        middleNameInput.prop( "disabled", false );
        residenceInput.prop( "disabled", false );
        
        // Toggle the black text
        toggleDisplayText();
    }

    function hide() {
        $(id).hide();
        $(window).resize();
    }

    function load(personData) {
        currentPerson = personData;
        birthplaceInput.val(personData.getBirthplace());
        dateOfBirthInput.val(personData.getDateOfBirth());
        dateOfDeathInput.val(personData.getDateOfDeath());
        firstNameInput.val(personData.getFirstName());
        genderSelect.val(personData.getGender());
        generationInput.val(personData.getGeneration());
        lastNameInput.val(personData.getLastName());
        middleNameInput.val(personData.getMiddleName());
        residenceInput.val(personData.getResidence());

    }

    function save() {
        
        currentPerson.setBirthplace(birthplaceInput.val());
        currentPerson.setDateOfBirth(dateOfBirthInput.val());
        currentPerson.setDateOfDeath(dateOfDeathInput.val());
        currentPerson.setFirstName(firstNameInput.val());
        currentPerson.setGender(genderSelect.val());
        currentPerson.setGeneration(generationInput.val());
        currentPerson.setLastName(lastNameInput.val());
        currentPerson.setMiddleName(middleNameInput.val());
        currentPerson.setResidence(residenceInput.val());

    }

    function show(personData) {
        load(personData);
        $(id).show();
        $(window).resize();
    }
    
    function toggleDisplayText() {
        birthplaceInput.toggleClass("displayText");
        dateOfBirthInput.toggleClass("displayText");
        dateOfDeathInput.toggleClass("displayText");
        firstNameInput.toggleClass("displayText");
        genderSelect.toggleClass("displayText");
        generationInput.toggleClass("displayText");
        lastNameInput.toggleClass("displayText");
        middleNameInput.toggleClass("displayText");
        residenceInput.toggleClass("displayText");
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