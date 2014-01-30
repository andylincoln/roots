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

    this.dateBirth = new Date(0,1,1);
    this.dateBirth.setFullYear(0000);
    this.dateDeath = new Date(0,1,1);
    this.dateDeath.setFullYear(0000);
    this.firstName = firstName;
    this.gender = "";
    this.lastName = lastName;
    this.middleName = middleName;

    //  Getter Definitions
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

    //  Setter Definitions 
    this.setFirstName = function(newName) {
        this.firstName = newName;
    };
    this.setGender = function(gender) {
        this.gender = gender;
    };
    this.setMiddleName = function(newName) {
        this.MiddleName = newName;
    };
    this.setLastName = function(newName) {
        this.LastName = newName;
    };
    
}

