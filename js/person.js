/* 
 * Author: Andrew Lincoln
 * Date Created: 02/14/2014 12:07 PM
 * Date Updated: 03/12/2014 3:16 PM
 * 
 * person.js
 */

//TODO: Implement Automatic Generation Counter

function Person() {

    var birthplace = null,
            parents = [],
            children = [],
            spouses = [],
            dateBirth = null,
            dateDeath = null,
            id = Date.now(),
            gender = null,
            generation = null,
            firstName = null,
            formerSpouses,
            lastName = null,
            middleName = null,
            pictureURL = null,
            residence = null,
            suffix = null;

    function birthplaceGetter() {
        return birthplace;
    }

    function birthplaceSetter(loc) {
        birthplace = loc;
    }

    function childrenGetter() {
        return children;
    }

    function childrenSetter(child) {
        children.push(child);
    }

    function parentSetter(parent) {
        parents.push(parent);
    }

    function spouseGetter() {
        return spouses;
    }

    function spouseSetter(person) {
        spouses.push(person);
    }

    function dateOfBirthGetter() {
        return dateBirth;
    }

    function dateOfBirthSetter(date) {
        dateBirth = date;
    }

    function dateOfDeathGetter() {
        return dateDeath;
    }

    function dateOfDeathSetter(date) {
        dateDeath = date;
    }

    function firstNameGetter() {
        return firstName;
    }

    function firstNameSetter(strName) {
        firstName = strName;
    }

    function formerSpouseGetter() {
        return formerSpouses;
    }

    function formerSpouseSetter(person) {

        if (formerSpouses === null) {
            formerSpouses = Map();
        }

        formerSpouses.set(person);
    }

    function genderGetter() {
        return gender;
    }

    function genderSetter(strGender) {
        gender = strGender;
    }

    function generationGetter() {
        return generation;
    }

    function generationSetter(num) {
        generation = num;
    }

    function idGetter() {
        return id;
    }

    function jsolGetter() {
        // Can add more to this in the future, I only put
        // what is currently in the detail panel
        return {
            "birthplace": birthplace,
            "dateBirth": dateBirth,
            "dateDeath": dateDeath,
            "id": id,
            "gender": gender,
            "generation": generation,
            "firstName": firstName,
            "lastName": lastName,
            "middleName": middleName,
            "residence": residence,
            "parents": parents,
            "children": children,
            "spouses": spouses
        }
    }

    function lastNameGetter() {
        return lastName;
    }

    function lastNameSetter(strName) {
        lastName = strName;
    }

    function middleNameGetter() {
        return middleName;
    }

    function middleNameSetter(strName) {
        middleName = strName;
    }

    function nameGetter() {

        if (middleName === null) {
            return firstNameGetter() + " " + lastNameGetter();
        }

        return firstNameGetter() + " " + middleNameGetter() + " " + lastNameGetter();
    }

    function nameSetter(strFirst, strLast, strMiddle) {

        firstNameSetter(strFirst);
        middleNameSetter(strMiddle);
        lastNameSetter(strLast);

    }

    function pictureURLGetter() {
        return pictureURL;
    }

    function pictureURLSetter(strURL) {
        pictureURL = strURL;
    }

    function residenceGetter() {
        return residence;
    }

    function residenceSetter(loc) {
        residence = loc;
    }
    
    function suffixGetter() {
        return suffix;
    }
    
    function suffixSetter(strSuffix) {
        suffix = strSuffix;
    }

    return {
        addChild: childrenSetter,
        addFormerSpouse: formerSpouseSetter,
        getBirthplace: birthplaceGetter,
        getCurrentSpouse: spouseGetter,
        getChildren: childrenGetter,
        getDateOfBirth: dateOfBirthGetter,
        getDateOfDeath: dateOfDeathGetter,
        getFirstName: firstNameGetter,
        getFormerSpouse: formerSpouseGetter,
        getGender: genderGetter,
        getGeneration: generationGetter,
        getID: idGetter,
        getJSOL: jsolGetter,
        getLastName: lastNameGetter,
        getMiddleName: middleNameGetter,
        getName: nameGetter,
        getPictureURL: pictureURLGetter,
        getResidence: residenceGetter,
        getSuffix: suffixGetter,
        setBirthplace: birthplaceSetter,
        setChildren: childrenSetter,
        setSpouse: spouseSetter,
        setParent: parentSetter,
        setDateOfBirth: dateOfBirthSetter,
        setDateOfDeath: dateOfDeathSetter,
        setFirstName: firstNameSetter,
        setFormerSpouse: formerSpouseSetter,
        setGender: genderSetter,
        setGeneration: generationSetter,
        setLastName: lastNameSetter,
        setMiddleName: middleNameSetter,
        setName: nameSetter,
        setPictureURL: pictureURLSetter,
        setResidence: residenceSetter,
        setSuffix: suffixSetter
    };
}