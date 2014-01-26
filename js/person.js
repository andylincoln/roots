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
 * @returns {Person}
 */
function Person(firstName) {
    Person(firstName, "", "");
}

/**
 * Person Constructor
 * 
 * @param {String} firstName ; not Null
 * @param {String} lastName  ; not Null
 * @returns {Person}
 */
function Person(firstName, lastName) {
    Person(firstName, "", lastName);
}

/**
 * Person Constructor
 * 
 * @param {String} firstName
 * @param {String} middleName
 * @param {String} lastName
 * @returns {Person}
 */

function Person(firstName, middleName, lastName) {

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;

    /**
     * Getter Definitions
     */
    this.getFirstName = function() {
        return this.firstName;
    };
    this.getMiddleName = function() {
        return this.middleName;
    };
    this.getLastName = function() {
        return this.lastName;
    };
    this.getName = function() {
        
        if (!this.getMiddleName() && !this.getLastName()) {
            return this.getFirstName();
        }
        if(!this.getMiddleName() && this.getLastName()) {
            return (this.getFirstName() + "" + this.getMiddleName + "" + this.getLastName());
        } 
        
        return (this.getFirstName() + "" + this.getMiddleName + "" + this.getLastName());
    };

    /**
     * Setter Definitions
     */
    
    this.setFirstName = function(newName) {
        this.firstName = newName;
    };
    this.setMiddleName = function(newName) {
        this.MiddleName = newName;
    };
    this.setLastName = function(newName) {
        this.LastName = newName;
    };

    /*
     * gender
     * date of birth
     * date of death  
     */

}

