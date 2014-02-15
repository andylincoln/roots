/* 
 * Author: Andrew Lincoln
 * Date Created: 02/14/2014 12:07 PM
 * Date Updated: 02/14/2014 --------
 * 
 * person.js
 */
//TODO: Add checks for proper types to all setters
//TODO: Implement Generation Counter


var Person = function() {

    var birthplace = null,
            children = null,
            dateBirth = null,
            dateDeath = null,
            id = Date.now(),
            gender = null,
            generation = null,
            firstName = null,
            formerSpouses,
            lastName = null,
            middleName = null,
            residence = null,
            currentSpouse = null;

    function birthPlaceGetter() {
        return birthplace;
    }

    function birthPlaceSetter(loc) {
        birthplace = loc;
    }

    function childrenGetter() {
        return children;
    }

    function childrenSetter(child) {
        if (children === null) {
            children = Map();
        }
        children.set(child);
    }

    function currentSpouseGetter() {
        return currentSpouse;
    }

    function currentSpouseSetter(person) {
        currentSpouse = person;
    }

    function dateOfBirthGetter() {
        return dateBirth;
    }

    function dateOfBirthSetter(date) {
        dateBirth = date;
    }

    function dateOfDeathGetter() {
        return dateBirth;
    }

    function dateOfDeathSetter(date) {
        dateBirth = date;
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
        throw Exception("TODO: Not yet implemented");
    }

    function generationSetter() {
        throw Exception("TODO: Not yet implemented");
    }

    function idGetter() {
        return id;
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

    function residenceGetter() {
        return residence;
    }

    function residenceSetter(loc) {
        residence = loc;
    }

    return {
        addChild: childrenSetter,
        addFormerSpouse: formerSpouseSetter,
        getBirthPlace: birthPlaceGetter,
        getCurrentSpouse: currentSpouseGetter,
        getChildren: childrenGetter,
        getDateOfBirth: dateOfBirthGetter,
        getDateOfDeath: dateOfDeathGetter,
        getFirstName: firstNameGetter,
        getGender: genderGetter,
        getGeneration: generationGetter,
        getID: idGetter,
        getLastName: lastNameGetter,
        getMiddleName: middleNameGetter,
        getName: nameGetter,
        getResidence: residenceGetter,
        setBirthPlace: birthPlaceSetter,
        setCurrentSpouse: currentSpouseSetter,
        setDateOfBirth: dateOfBirthSetter,
        setDateOfDeath: dateOfDeathGetter,
        setFirstName: firstNameSetter,
        setGender: genderSetter,
        setGeneration: generationSetter,
        setLastName: lastNameSetter,
        setMiddleName: middleNameSetter,
        setName : nameSetter,
        setResidence: residenceSetter
    };
}; 


var Location = function() {
    var city, state, country;
    var toClass = {}.toString;
    function cityGetter() {
        return city;
    };
    
    function citySetter(strCity) {
        city = strCity;
    };
    
    function countryGetter() {
        return country;
    };
    
    function countrySetter(strCountry) {
        country = strCountry;
    };
    
    function stateGetter() {
        return state;
    };
    
    function stateSetter(strState) {
        state = strState;
    }
    
    function toClassGetter() {
        return toClass;
    }
    
    return {
      getCity : cityGetter,
      getCountry : countryGetter,
      getState : stateGetter,
      getToClass : toClassGetter,
      setCity : citySetter,
      setCountry : countryGetter,
      setState : stateSetter
    };
};