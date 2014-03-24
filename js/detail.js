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
            currentNode,
            currentPerson,
            checkEdit,
            checkLiving,
            dateOfBirthInput,
            dateOfDeathInput,
            firstNameInput,
            genderSelect,
            generationInput,
            lastNameInput,
            middleNameInput,
            residenceInput,
            saveButton,
            suffixInput;

    birthplaceInput = $(idPrefix + "Birthplace");
    checkEdit = $(idPrefix + "CheckEdit");
    checkLiving = $(idPrefix + "CheckLiving");
    dateOfBirthInput = $(idPrefix + "DateBirth");
    dateOfDeathInput = $(idPrefix + "DateDeath");
    firstNameInput = $(idPrefix + "FirstName");
    genderSelect = $(idPrefix + "Gender");
    generationInput = $(idPrefix + "Generation");
    lastNameInput = $(idPrefix + "LastName");
    middleNameInput = $(idPrefix + "MiddleName");
    residenceInput = $(idPrefix + "Residence");
    saveButton = $(idPrefix + "Save");
    suffixInput = $(idPrefix + "Suffix");

    checkEdit.button({
        icons: {
            primary: "ui-icon-pencil"
        }
    });
    checkLiving.button();
    saveButton.button({
        icons: {
            primary: "ui-icon-disk"
        }
    });

    //Default to enabled
    // Hide the detail panel initially:
    enable();
    hide();

    /************************Function Definitions******************************/

    function disable() {
        //  Disable the inputs
        birthplaceInput.prop("disabled", true);
        dateOfBirthInput.prop("disabled", true);
        dateOfDeathInput.prop("disabled", true);
        firstNameInput.prop("disabled", true);
        genderSelect.prop("disabled", true);
        generationInput.prop("disabled", true);
        lastNameInput.prop("disabled", true);
        middleNameInput.prop("disabled", true);
        residenceInput.prop("disabled", true);
        suffixInput.prop("disabled", true);

        //  Hide the save button
        saveButton.hide();

        // Toggle the black text
        toggleDisplayText();
    }

    function enable() {
        //  Enable the inputs
        birthplaceInput.prop("disabled", false);
        dateOfBirthInput.prop("disabled", false);
        dateOfDeathInput.prop("disabled", false);
        firstNameInput.prop("disabled", false);
        genderSelect.prop("disabled", false);
        generationInput.prop("disabled", false);
        lastNameInput.prop("disabled", false);
        middleNameInput.prop("disabled", false);
        residenceInput.prop("disabled", false);
        suffixInput.prop("disabled", false);

        //  Show the save button
        saveButton.show();

        // Toggle the black text
        toggleDisplayText();
        
        // Hide null fields
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
        suffixInput.val(personData.getSuffix());

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
        currentPerson.setSuffix(suffixInput.val());

        // Update the node's display text
        currentNode.updateText();
    }

    function show(node) {
        // Save the current node and load its data to the detail panel
        currentNode = node;
        load(node.getData());

        // Show the detail panel and adjust the window
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
        suffixInput.toggleClass("displayText");

        $("#livingRow").toggle();
    }

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