/* 
 * Author: Andrew Lincoln
 * Date Created: 02/14/2014 12:07 PM
 * Date Updated: 02/14/2014 --------
 * 
 * person.js
 */
//TODO: Add checks for proper types to all setters
//TODO: Implement Generation Counter


function Person(x, y) {

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
            pictureURL = null,
            residence = null,
            currentSpouse = null,
            canvasPosition = {x: x, y: y};

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
        return dateDeath;
    }

    function dateOfDeathSetter(date) {

        dateDeath = date;
    }

    function firstNameGetter() {
        return firstName;
    }

    function firstNameSetter(strName) {

        if (!(typeof strName === "string")) {
            throw Exception("Person.setFirstName(): argument strName expects type string");
        }

        firstName = strName;
    }

    function formerSpouseGetter() {
        return formerSpouses;
    }

    function formerSpouseSetter(person) {

        if (person === null) {
            throw Exception("Person.addFormerSpouse(): Null argument invalid, expects type Person");
        }

        if (formerSpouses === null) {
            formerSpouses = Map();
        }

        formerSpouses.set(person);
    }

    function genderGetter() {
        return gender;
    }

    function genderSetter(strGender) {

        if (!(typeof strGender === "string")) {
            throw Exception("Person.setGender(): argument strGender expects type string");
        }

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

        if (!(typeof strName === "string")) {
            throw("Person.setLastName: argument strName expects type string");
        }

        lastName = strName;
    }

    function middleNameGetter() {
        return middleName;
    }

    function middleNameSetter(strName) {

        if (!(typeof strName === "string")) {
            throw("Person.setMiddleName: argument strName expects type string");
        }

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
        if(!(typeof strURL === "string")) {
            throw("Person.setMiddleName: argument strName expects type string");
        }
        pictureURL = strURL;
    }

    function positionGetter() {
        return canvasPosition;
    }

    function positionSetter(x, y) {
        canvasPosition = {x: x, y: y};
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
        getBirthplace: birthplaceGetter,
        getCurrentSpouse: currentSpouseGetter,
        getChildren: childrenGetter,
        getDateOfBirth: dateOfBirthGetter,
        getDateOfDeath: dateOfDeathGetter,
        getFirstName: firstNameGetter,
        getFormerSpouse: formerSpouseGetter,
        getGender: genderGetter,
        getGeneration: generationGetter,
        getID: idGetter,
        getLastName: lastNameGetter,
        getMiddleName: middleNameGetter,
        getName: nameGetter,
        getPictureURL: pictureURLGetter,
        getPosition: positionGetter,
        getResidence: residenceGetter,
        setBirthplace: birthplaceSetter,
        setCurrentSpouse: currentSpouseSetter,
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
        setPosition: positionSetter,
        setResidence: residenceSetter
    };
};


function Location() {
    var city, state, country,
            toClass = {}.toString;

    function cityGetter() {
        return city;
    }


    function citySetter(strCity) {
        city = strCity;
    }


    function countryGetter() {
        return country;
    }


    function countrySetter(strCountry) {
        country = strCountry;
    }


    function locationGetter() {
        
        if (stateGetter() === null) {
            return cityGetter() + ", " + countryGetter();
        }
        
        return cityGetter() + ", " + stateGetter() + " " + countryGetter();
    }

    function stateGetter() {
        return state;
    }

    function stateSetter(strState) {
        state = strState;
    }

    function toClassGetter() {
        return toClass;
    }

    countryCodes = [
        {
            code: "AF",
            name: "Afghanistan"
        },
        {
            code: "AL",
            name: "Albania"
        },
        {
            code: "DZ",
            name: "Algeria"
        },
        {
            code: "AS",
            name: "American Samoa"
        },
        {
            code: "AD",
            name: "Andorra"
        },
        {
            code: "AO",
            name: "Angola"
        },
        {
            code: "AI",
            name: "Anguilla"
        },
        {
            code: "AQ",
            name: "Antarctica"
        },
        {
            code: "AG",
            name: "Antigua and Barbuda"
        },
        {
            code: "AR",
            name: "Argentina"
        },
        {
            code: "AM",
            name: "Armenia"
        },
        {
            code: "AW",
            name: "Aruba"
        },
        {
            code: "AU",
            name: "Australia"
        },
        {
            code: "AT",
            name: "Austria"
        },
        {
            code: "AZ",
            name: "Azerbaijan"
        },
        {
            code: "BS",
            name: "Bahamas"
        },
        {
            code: "BH",
            name: "Bahrain"
        },
        {
            code: "BD",
            name: "Bangladesh"
        },
        {
            code: "BB",
            name: "Barbados"
        },
        {
            code: "BY",
            name: "Belarus"
        },
        {
            code: "BE",
            name: "Belgium"
        },
        {
            code: "BZ",
            name: "Belize"
        },
        {
            code: "BJ",
            name: "Benin"
        },
        {
            code: "BM",
            name: "Bermuda"
        },
        {
            code: "BT",
            name: "Bhutan"
        },
        {
            code: "BO",
            name: "Bolivia, Plurinational State Of"
        },
        {
            code: "BQ",
            name: "Bonaire, Sint Eustatius and Saba"
        },
        {
            code: "BA",
            name: "Bosnia and Herzegovina"
        },
        {
            code: "BW",
            name: "Botswana"
        },
        {
            code: "BV",
            name: "Bouvet Island"
        },
        {
            code: "BR",
            name: "Brazil"
        },
        {
            code: "IO",
            name: "British Indian Ocean Territory"
        },
        {
            code: "BN",
            name: "Brunei Darussalam"
        },
        {
            code: "BG",
            name: "Bulgaria"
        },
        {
            code: "BF",
            name: "Burkina Faso"
        },
        {
            code: "BI",
            name: "Burundi"
        },
        {
            code: "KH",
            name: "Cambodia"
        },
        {
            code: "CM",
            name: "Cameroon"
        },
        {
            code: "CA",
            name: "Canada"
        },
        {
            code: "CV",
            name: "Cape Verde"
        },
        {
            code: "KY",
            name: "Cayman Islands"
        },
        {
            code: "CF",
            name: "Central African Republic"
        },
        {
            code: "TD",
            name: "Chad"
        },
        {
            code: "CL",
            name: "Chile"
        },
        {
            code: "CN",
            name: "China"
        },
        {
            code: "CX",
            name: "Christmas Island"
        },
        {
            code: "CC",
            name: "Cocos (Keeling) Islands"
        },
        {
            code: "CO",
            name: "Colombia"
        },
        {
            code: "KM",
            name: "Comoros"
        },
        {
            code: "CG",
            name: "Congo"
        },
        {
            code: "CD",
            name: "Congo The Democratic Republic Of The"
        },
        {
            code: "CK",
            name: "Cook Islands"
        },
        {
            code: "CR",
            name: "Costa Rica"
        },
        {
            code: "HR",
            name: "Croatia"
        },
        {
            code: "CU",
            name: "Cuba"
        },
        {
            code: "CW",
            name: "Curaçao"
        },
        {
            code: "CY",
            name: "Cyprus"
        },
        {
            code: "CZ",
            name: "Czech Republic"
        },
        {
            code: "CI",
            name: "Côte D\"Ivoire"
        },
        {
            code: "DK",
            name: "Denmark"
        },
        {
            code: "DJ",
            name: "Djibouti"
        },
        {
            code: "DM",
            name: "Dominica"
        },
        {
            code: "DO",
            name: "Dominican Republic"
        },
        {
            code: "EC",
            name: "Ecuador"
        },
        {
            code: "EG",
            name: "Egypt"
        },
        {
            code: "SV",
            name: "El Salvador"
        },
        {
            code: "GQ",
            name: "Equatorial Guinea"
        },
        {
            code: "ER",
            name: "Eritrea"
        },
        {
            code: "EE",
            name: "Estonia"
        },
        {
            code: "ET",
            name: "Ethiopia"
        },
        {
            code: "FK",
            name: "Falkland Islands  (Malvinas)"
        },
        {
            code: "FO",
            name: "Faroe Islands"
        },
        {
            code: "FJ",
            name: "Fiji"
        },
        {
            code: "FI",
            name: "Finland"
        },
        {
            code: "FR",
            name: "France"
        },
        {
            code: "GF",
            name: "French Guiana"
        },
        {
            code: "PF",
            name: "French Polynesia"
        },
        {
            code: "TF",
            name: "French Southern Territories"
        },
        {
            code: "GA",
            name: "Gabon"
        },
        {
            code: "GM",
            name: "Gambia"
        },
        {
            code: "GE",
            name: "Georgia"
        },
        {
            code: "DE",
            name: "Germany"
        },
        {
            code: "GH",
            name: "Ghana"
        },
        {
            code: "GI",
            name: "Gibraltar"
        },
        {
            code: "GR",
            name: "Greece"
        },
        {
            code: "GL",
            name: "Greenland"
        },
        {
            code: "GD",
            name: "Grenada"
        },
        {
            code: "GP",
            name: "Guadeloupe"
        },
        {
            code: "GU",
            name: "Guam"
        },
        {
            code: "GT",
            name: "Guatemala"
        },
        {
            code: "GG",
            name: "Guernsey"
        },
        {
            code: "GN",
            name: "Guinea"
        },
        {
            code: "GW",
            name: "Guinea-Bissau"
        },
        {
            code: "GY",
            name: "Guyana"
        },
        {
            code: "HT",
            name: "Haiti"
        },
        {
            code: "HM",
            name: "Heard Island and McDonald Islands"
        },
        {
            code: "VA",
            name: "Holy See (Vatican City State)"
        },
        {
            code: "HN",
            name: "Honduras"
        },
        {
            code: "HK",
            name: "Hong Kong"
        },
        {
            code: "HU",
            name: "Hungary"
        },
        {
            code: "IS",
            name: "Iceland"
        },
        {
            code: "IN",
            name: "India"
        },
        {
            code: "ID",
            name: "Indonesia"
        },
        {
            code: "IR",
            name: "Iran, Islamic Republic Of"
        },
        {
            code: "IQ",
            name: "Iraq"
        },
        {
            code: "IE",
            name: "Ireland"
        },
        {
            code: "IM",
            name: "Isle of Man"
        },
        {
            code: "IL",
            name: "Israel"
        },
        {
            code: "IT",
            name: "Italy"
        },
        {
            code: "JM",
            name: "Jamaica"
        },
        {
            code: "JP",
            name: "Japan"
        },
        {
            code: "JE",
            name: "Jersey"
        },
        {
            code: "JO",
            name: "Jordan"
        },
        {
            code: "KZ",
            name: "Kazakhstan"
        },
        {
            code: "KE",
            name: "Kenya"
        },
        {
            code: "KI",
            name: "Kiribati"
        },
        {
            code: "KP",
            name: "Korea, Democratic People\"s Republic Of"
        },
        {
            code: "KR",
            name: "Korea, Republic of"
        },
        {
            code: "KW",
            name: "Kuwait"
        },
        {
            code: "KG",
            name: "Kyrgyzstan"
        },
        {
            code: "LA",
            name: "Lao People\"s Democratic Republic"
        },
        {
            code: "LV",
            name: "Latvia"
        },
        {
            code: "LB",
            name: "Lebanon"
        },
        {
            code: "LS",
            name: "Lesotho"
        },
        {
            code: "LR",
            name: "Liberia"
        },
        {
            code: "LY",
            name: "Libya"
        },
        {
            code: "LI",
            name: "Liechtenstein"
        },
        {
            code: "LT",
            name: "Lithuania"
        },
        {
            code: "LU",
            name: "Luxembourg"
        },
        {
            code: "MO",
            name: "Macao"
        },
        {
            code: "MK",
            name: "Macedonia, the Former Yugoslav Republic Of"
        },
        {
            code: "MG",
            name: "Madagascar"
        },
        {
            code: "MW",
            name: "Malawi"
        },
        {
            code: "MY",
            name: "Malaysia"
        },
        {
            code: "MV",
            name: "Maldives"
        },
        {
            code: "ML",
            name: "Mali"
        },
        {
            code: "MT",
            name: "Malta"
        },
        {
            code: "MH",
            name: "Marshall Islands"
        },
        {
            code: "MQ",
            name: "Martinique"
        },
        {
            code: "MR",
            name: "Mauritania"
        },
        {
            code: "MU",
            name: "Mauritius"
        },
        {
            code: "YT",
            name: "Mayotte"
        },
        {
            code: "MX",
            name: "Mexico"
        },
        {
            code: "FM",
            name: "Micronesia, Federated States Of"
        },
        {
            code: "MD",
            name: "Moldova, Republic of"
        },
        {
            code: "MC",
            name: "Monaco"
        },
        {
            code: "MN",
            name: "Mongolia"
        },
        {
            code: "ME",
            name: "Montenegro"
        },
        {
            code: "MS",
            name: "Montserrat"
        },
        {
            code: "MA",
            name: "Morocco"
        },
        {
            code: "MZ",
            name: "Mozambique"
        },
        {
            code: "MM",
            name: "Myanmar"
        },
        {
            code: "NA",
            name: "Namibia"
        },
        {
            code: "NR",
            name: "Nauru"
        },
        {
            code: "NP",
            name: "Nepal"
        },
        {
            code: "NL",
            name: "Netherlands"
        },
        {
            code: "NC",
            name: "New Caledonia"
        },
        {
            code: "NZ",
            name: "New Zealand"
        },
        {
            code: "NI",
            name: "Nicaragua"
        },
        {
            code: "NE",
            name: "Niger"
        },
        {
            code: "NG",
            name: "Nigeria"
        },
        {
            code: "NU",
            name: "Niue"
        },
        {
            code: "NF",
            name: "Norfolk Island"
        },
        {
            code: "MP",
            name: "Northern Mariana Islands"
        },
        {
            code: "NO",
            name: "Norway"
        },
        {
            code: "OM",
            name: "Oman"
        },
        {
            code: "PK",
            name: "Pakistan"
        },
        {
            code: "PW",
            name: "Palau"
        },
        {
            code: "PS",
            name: "Palestinian Territory, Occupied"
        },
        {
            code: "PA",
            name: "Panama"
        },
        {
            code: "PG",
            name: "Papua New Guinea"
        },
        {
            code: "PY",
            name: "Paraguay"
        },
        {
            code: "PE",
            name: "Peru"
        },
        {
            code: "PH",
            name: "Philippines"
        },
        {
            code: "PN",
            name: "Pitcairn"
        },
        {
            code: "PL",
            name: "Poland"
        },
        {
            code: "PT",
            name: "Portugal"
        },
        {
            code: "PR",
            name: "Puerto Rico"
        },
        {
            code: "QA",
            name: "Qatar"
        },
        {
            code: "RO",
            name: "Romania"
        },
        {
            code: "RU",
            name: "Russian Federation"
        },
        {
            code: "RW",
            name: "Rwanda"
        },
        {
            code: "RE",
            name: "Réunion"
        },
        {
            code: "BL",
            name: "Saint Barthélemy"
        },
        {
            code: "SH",
            name: "Saint Helena, Ascension and Tristan Da Cunha"
        },
        {
            code: "KN",
            name: "Saint Kitts And Nevis"
        },
        {
            code: "LC",
            name: "Saint Lucia"
        },
        {
            code: "MF",
            name: "Saint Martin (French Part)"
        },
        {
            code: "PM",
            name: "Saint Pierre And Miquelon"
        },
        {
            code: "VC",
            name: "Saint Vincent And The Grenadines"
        },
        {
            code: "WS",
            name: "Samoa"
        },
        {
            code: "SM",
            name: "San Marino"
        },
        {
            code: "ST",
            name: "Sao Tome and Principe"
        },
        {
            code: "SA",
            name: "Saudi Arabia"
        },
        {
            code: "SN",
            name: "Senegal"
        },
        {
            code: "RS",
            name: "Serbia"
        },
        {
            code: "SC",
            name: "Seychelles"
        },
        {
            code: "SL",
            name: "Sierra Leone"
        },
        {
            code: "SG",
            name: "Singapore"
        },
        {
            code: "SX",
            name: "Sint Maarten (Dutch part)"
        },
        {
            code: "SK",
            name: "Slovakia"
        },
        {
            code: "SI",
            name: "Slovenia"
        },
        {
            code: "SB",
            name: "Solomon Islands"
        },
        {
            code: "SO",
            name: "Somalia"
        },
        {
            code: "ZA",
            name: "South Africa"
        },
        {
            code: "GS",
            name: "South Georgia and the South Sandwich Islands"
        },
        {
            code: "SS",
            name: "South Sudan"
        },
        {
            code: "ES",
            name: "Spain"
        },
        {
            code: "LK",
            name: "Sri Lanka"
        },
        {
            code: "SD",
            name: "Sudan"
        },
        {
            code: "SR",
            name: "Suriname"
        },
        {
            code: "SJ",
            name: "Svalbard And Jan Mayen"
        },
        {
            code: "SZ",
            name: "Swaziland"
        },
        {
            code: "SE",
            name: "Sweden"
        },
        {
            code: "CH",
            name: "Switzerland"
        },
        {
            code: "SY",
            name: "Syrian Arab Republic"
        },
        {
            code: "TW",
            name: "Taiwan, Province Of China"
        },
        {
            code: "TJ",
            name: "Tajikistan"
        },
        {
            code: "TZ",
            name: "Tanzania, United Republic of"
        },
        {
            code: "TH",
            name: "Thailand"
        },
        {
            code: "TL",
            name: "Timor-Leste"
        },
        {
            code: "TG",
            name: "Togo"
        },
        {
            code: "TK",
            name: "Tokelau"
        },
        {
            code: "TO",
            name: "Tonga"
        },
        {
            code: "TT",
            name: "Trinidad and Tobago"
        },
        {
            code: "TN",
            name: "Tunisia"
        },
        {
            code: "TR",
            name: "Turkey"
        },
        {
            code: "TM",
            name: "Turkmenistan"
        },
        {
            code: "TC",
            name: "Turks and Caicos Islands"
        },
        {
            code: "TV",
            name: "Tuvalu"
        },
        {
            code: "UG",
            name: "Uganda"
        },
        {
            code: "UA",
            name: "Ukraine"
        },
        {
            code: "AE",
            name: "United Arab Emirates"
        },
        {
            code: "GB",
            name: "United Kingdom"
        },
        {
            code: "US",
            name: "United States"
        },
        {
            code: "UM",
            name: "United States Minor Outlying Islands"
        },
        {
            code: "UY",
            name: "Uruguay"
        },
        {
            code: "UZ",
            name: "Uzbekistan"
        },
        {
            code: "VU",
            name: "Vanuatu"
        },
        {
            code: "VE",
            name: "Venezuela, Bolivarian Republic of"
        },
        {
            code: "VN",
            name: "Vietnam"
        },
        {
            code: "VG",
            name: "Virgin Islands, British"
        },
        {
            code: "VI",
            name: "Virgin Islands, U.S."
        },
        {
            code: "WF",
            name: "Wallis and Futuna"
        },
        {
            code: "EH",
            name: "Western Sahara"
        },
        {
            code: "YE",
            name: "Yemen"
        },
        {
            code: "ZM",
            name: "Zambia"
        },
        {
            code: "ZW",
            name: "Zimbabwe"
        },
        {
            code: "AX",
            name: "Åland Islands"
        }
    ];

    usStates = [
        {name: "Alabama", code: "AL"},
        {name: "Alaska", code: "AK"},
        {name: "American Samoa", code: "AS"},
        {name: "Arizona", code: "AZ"},
        {name: "Arkansas", code: "AR"},
        {name: "California", code: "CA"},
        {name: "Colorado", code: "CO"},
        {name: "Connecticut", code: "CT"},
        {name: "Delaware", code: "DE"},
        {name: "District of Columbia", code: "DC"},
        {name: "Federated States of Micronesia", code: "FM"},
        {name: "Florida", code: "FL"},
        {name: "Georgia", code: "GA"},
        {name: "Guam", code: "GU"},
        {name: "Hawaii", code: "HI"},
        {name: "Idaho", code: "ID"},
        {name: "Illinois", code: "IL"},
        {name: "Indiana", code: "IN"},
        {name: "Iowa", code: "IA"},
        {name: "Kansas", code: "KS"},
        {name: "Kentucky", code: "KY"},
        {name: "Louisiana", code: "LA"},
        {name: "Maine", code: "ME"},
        {name: "Marshall Islands", code: "MH"},
        {name: "Maryland", code: "MD"},
        {name: "Massachusetts", code: "MA"},
        {name: "Michigan", code: "MI"},
        {name: "Minnestoa", code: "MN"},
        {name: "Mississippi", code: "MS"},
        {name: "Missouri", code: "MO"},
        {name: "Montana", code: "MT"},
        {name: "Nebraska", code: "NE"},
        {name: "Nevada", code: "NV"},
        {name: "New Hampshire", code: "NH"},
        {name: "New Jersey", code: "NJ"},
        {name: "New Mexico", code: "NM"},
        {name: "New York", code: "NY"},
        {name: "North Carolina", code: "NC"},
        {name: "North Dakota", code: "ND"},
        {name: "Northern Mariana Islands", code: "MP"},
        {name: "Ohio", code: "OH"},
        {name: "Oklahoma", code: "OK"},
        {name: "Oregon", code: "OR"},
        {name: "Palau", code: "PW"},
        {name: "Pennsylvania", code: "PA"},
        {name: "Puerto Rico", code: "PR"},
        {name: "Rhode Island", code: "RI"},
        {name: "South Carolina", code: "SC"},
        {name: "South Dakota", code: "SD"},
        {name: "Tennessee", code: "TN"},
        {name: "Texas", code: "TX"},
        {name: "Utah", code: "UT"},
        {name: "Vermont", code: "VT"},
        {name: "Virgin Islands", code: "VI"},
        {name: "Virginia", code: "VA"},
        {name: "Washington", code: "WA"},
        {name: "West Virginia", code: "WV"},
        {name: "Wisconsin", code: "WI"},
        {name: "Wyoming", code: "WY"}
    ];

    return {
        getCity: cityGetter,
        getCountry: countryGetter,
        getState: stateGetter,
        getToClass: toClassGetter,
        location: locationGetter,
        setCity: citySetter,
        setCountry: countrySetter,
        setState: stateSetter
    };
};