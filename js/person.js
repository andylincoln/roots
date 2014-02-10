/* 
 * Author: Andrew Lincoln
 * Date: 01/23/2014 2:23 PM
 * 
 * person.js
 */

/**
 * Person Constructor
 * 
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} middleName (Optional)
 * @returns {Person}
 */

function Person(firstName, lastName, middleName) {

    if (!(typeof (firstName) === "string")) {
        throw Exception("Argument city to Location must be a String");
    }
    if (!(typeof (lastName) === "string")) {
        throw Exception("Argument state to Location must be a String");
    }
    if (!(typeof (middleName) === "string")) {
        throw Exception("Argument country to Location must be a String");
    }

    this.birthplace = null;
    this.children = null;
    this.dateBirth = null;
    this.dateDeath = null;
    this.firstName = firstName;
    this.id = Date.now();
    this.gender = null;
    this.generation = 1;
    this.lastName = lastName;
    this.middleName = middleName;
    this.residence = null;
    this.spouse = null;

    //  Getter Definitions
    this.getBirthplace = function() {
        return this.birthplace;
    };
    this.getChildren = function() {
        return this.children;
    };
    this.getDateOfBirth = function() {
        return this.dateBirth;
    };
    this.getDateOfDeath = function() {
        return this.dateDeath;
    };
    this.getFirstName = function() {
        return this.firstName;
    };
    this.getGender = function() {
        return this.gender;
    };
    this.getGeneration = function() {
        throw Exception("Not yet implemneted");
    };
    this.getID = function() {
        return this.id;
    };
    this.getLastName = function() {
        return this.lastName;
    };
    this.getMiddleName = function() {
        return this.middleName;
    };
    this.getName = function() {
        if (this.getMiddleName() === undefined) {
            return (this.getFirstName() + " " + this.getLastName());
        }
        return (this.getFirstName() + " " + this.getMiddleName() + " " + this.getLastName());
    };
    this.getResidence = function() {
        return this.residence;
    };
    this.getSpouse = function() {
        return this.spouse;
    };

    //  Setter Definitions 

    this.addChild = function(child) {

        if (this.children === null) {
            this.children = new Map();
        }
        this.children.set(child.getID(), child);
    };
    this.setBirthplace = function(location) {
        this.birthplace = location;
    };
    this.setDateOfBirth = function(date) {
        this.dateBirth = date;
    };
    this.setFirstName = function(newName) {
        this.firstName = newName;
    };
    this.setGender = function(gender) {
        this.gender = gender;
    };
    this.setGeneration = function(num) {
        //TODO: Implement Generation counter
        throw Exception("Not yet implemented");
    };
    this.setLastName = function(newName) {
        this.LastName = newName;
    };
    this.setMiddleName = function(newName) {
        this.MiddleName = newName;
    };
    this.setResidence = function(location) {
        this.residence = location;
    };
    this.setSpouse = function(spouse) {
        this.spouse = spouse;
    };

}


/**
 * Location Constructor
 * 
 * @param {String} city
 * @param {String} state
 * @param {String} country
 * @returns {Location}
 */
function Location(city, state, country) {

    if (!(typeof (city) === "string")) {
        throw Exception("Argument city to Location must be a String");
    }
    if (!(typeof (state) === "string")) {
        throw Exception("Argument state to Location must be a String");
    }
    if (!(typeof (country) === "string")) {
        throw Exception("Argument country to Location must be a String");
    }

    this.city = city;
    this.state = state;
    this.country = country;

    this.getCity = function() {
        return this.city;
    };
    this.getCountry = function() {
        return this.country;
    };
    this.getState = function() {
        return this.state;
    };


    // TODO: setters? Yes/No
    /* Reasoning: No
     *  A change to the location could just mean a new Location obj
     *  Locations can also be made on the fly, and less likely to be fiddled
     *  with accidentally
     */
}

