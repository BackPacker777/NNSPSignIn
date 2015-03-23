/**
 *   AUTHOR: hbates@northmen.org
 *   VERSION: 1.5
 *   CREATED: 02.12.2015
 *   PROJECT: NNSP Sign IN
 */

"use strict";

/** @type {Date} */
var date = new Date();

/** @type {Array} */
var patrollers = [];

/** @type {number} */
var t1Counter, t2Counter, t3Counter, t4Counter, t5Counter;

/** @type {string} */
var patroller;

function getDate() {
	var month = date.getMonth() + 1,
		day = date.getDate(),
		year = date.getFullYear(),
		weekDay = date.getDay(),
		fullDate = '<h3>' + month + "/" + day + "/" + year + '</h3>';
	document.getElementById("weekDay").innerHTML = getWeekDay(weekDay);
	return fullDate;
}

function getWeekDay(weekDay) {
	/** @type {Array.<string>} */
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return '<h3>' + days[weekDay] + '</h3>';
}

function setDayNight() {
	/** @type {number} */
	var hour = date.getHours();
	if (hour > 14 && hour < 23) {
		document.getElementById("dayNight").innerHTML = "<h3>Night</h3>";
	} else {
		document.getElementById("dayNight").innerHTML = "<h3>Day</h3>";
	}
}

function displayAM(shiftNum) {
    /** @type {number} */
    var hour = date.getHours();
    if (hour < 11 && hour > 1) {
        /** @type {HTMLElement} */
        var div = document.getElementById(shiftNum),
            amShiftLabel = document.createElement("span"),
            amShiftDiv = document.createElement("div"),
            amShiftFoundationLabel = document.createElement("label"),
            amShiftSwitch = document.createElement("input");

        amShiftLabel.class = "label left"; //https://stackoverflow.com/questions/3919291/when-to-use-setattribute-vs-attribute-in-javascript
        amShiftLabel.textContent = "AM half day?";
        amShiftDiv.class = "switch";
        amShiftFoundationLabel.for = "amShiftSwitch";
        amShiftSwitch.type = "checkbox";
        div.appendChild(amShiftLabel);
        div.appendChild(amShiftDiv);
        div.appendChild(amShiftSwitch);
        div.appendChild(amShiftFoundationLabel);
        handleAM(document.getElementById(shiftNum));
    }
}

function handleAM(shiftNum) {
    shiftNum.addEventListener('change', function() {
        //decrement days by .5 if checked, increment by .5 if checked
        if (this.checked) {

        } else {

        }
    });
}

function prepPatroller(teamNum) {
	teamNum.addEventListener('change', populatePatroller);
}

function populatePatroller() {
	patroller = event.target.id;

    var newDate = new Date();

	/** @type {string} */
	var rating,
		element = document.getElementById(patroller);

	/** @const */
    var LAST = 0,
        FIRST = 1,
        ID = 2,
        RATING = 3,
        DAYS = 4;

	/** @type {number} */
	var exists = 0;

	/** @type {Array.<string>} */
	var elementId = patroller.split('.');
	for (var i = 0; i < patrollers.length; i++) {
		if (element.value == patrollers[i][ID]) {
			document.getElementById("patroller." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + patrollers[i][FIRST] + " " + patrollers[i][LAST] + "</h4>";
			if (patrollers[i][RATING] == 1) {
				rating = "Basic";
			} else if (patrollers[i][RATING] == 2) {
				rating = "Senior";
			} else {
				rating = "Certified";
			}
			document.getElementById("rating." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + rating + "</h4>";
			var minutes = newDate.getMinutes();
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			document.getElementById("time." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + date.getHours() + ":" + minutes + "</h4>";
			patrollers[i][DAYS]++;

			document.getElementById("days." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + patrollers[i][DAYS] + "</h4>";
			patrollers.splice(patrollers[i]--, 1); //remove array element
			elementId[2]++;
			patroller = "patrollerID." + elementId[1] + "." + elementId[2];

			/** @type {boolean} */
			var addTeam = setCounter(elementId[1]);

			if (addTeam === true) {
				addPatrollerRow(elementId[1], elementId[2]);
				prepPatroller(document.getElementById(patroller));
			}

			exists = 1;
			break;
		}
	}
	if (exists == 0) {
		alert("PLEASE TRY AGAIN!"); //Do something here if number already in use.
		element.value = '';
	}
}

function setCounter(teamNum) {
	/** @const */
	var MAX_TEAM = 4;
	if (teamNum == 1) {
		if (typeof t1Counter == 'undefined') {
			t1Counter = 1;
		}
		if (t1Counter < MAX_TEAM) {
			t1Counter++;
			return true;
		} else {
			return false;
		}
	} else if (teamNum == 2) {
		if (typeof t2Counter == 'undefined') {
			t2Counter = 1;
		}
		if (t2Counter < MAX_TEAM) {
			t2Counter++;
			return true;
		} else {
			return false;
		}
	} else if (teamNum == 3) {
		if (typeof t3Counter == 'undefined') {
			t3Counter = 1;
		}
		if (t3Counter < MAX_TEAM) {
			t3Counter++;
			return true;
		} else {
			return false;
		}
	} else if (teamNum == 4) {
		if (typeof t4Counter == 'undefined') {
			t4Counter = 1;
		}
		if (t4Counter < MAX_TEAM) {
			t4Counter++;
			return true;
		} else {
			return false;
		}
	}  else {
		if (typeof t5Counter == 'undefined') {
			t5Counter = 1;
		}
		if (t5Counter < MAX_TEAM) {
			t5Counter++;
			return true;
		} else {
			return false;
		}
	}
}

function addPatrollerRow(teamNum, patrollerNum) {
	/** @type {string} */
    var team = ('team' + teamNum),
        currentPatroller = teamNum + '.' + patrollerNum;

	var row = document.createElement("div"),
        radioDiv = document.createElement("div"),
        inputRadio = document.createElement("input"),
        patrollerDiv = document.createElement("div"),
        inputPatrollerID = document.createElement("input"),
        patrollerRating = document.createElement("div"),
        patrollerTime = document.createElement("div"),
        shiftDiv = document.createElement("div"),
        daysDivLabel = document.createElement("label"),
        daysDiv = document.createElement("div"),
        guestDiv = document.createElement("div"),
        inputGuest = document.createElement("input");

    row.setAttribute("class", "row fullWidth");
    row.id = "row." + currentPatroller;
    radioDiv.setAttribute("class", "small-1 column");
    radioDiv.id = "radioDiv." + currentPatroller;
    inputRadio.type = "number";
    inputRadio.id = "radioNum." + currentPatroller;
    inputRadio.placeholder = "Radio";
    patrollerDiv.setAttribute("class", "small-2 columns");
    patrollerDiv.id = "patroller." + currentPatroller;
    inputPatrollerID.type = "number";
    inputPatrollerID.id = "patrollerID." + currentPatroller;
    inputPatrollerID.placeholder = "ID Number";
    patrollerRating.setAttribute("class", "small-1 column");
    patrollerRating.id = "rating." + currentPatroller;
    patrollerTime.setAttribute("class", "small-1 column");
    patrollerTime.id = "time." + currentPatroller;
    shiftDiv.setAttribute("class", "small-1 column");
    shiftDiv.id = "shift." + currentPatroller;
    daysDivLabel.setAttribute("class", "label left");
    daysDivLabel.textContent = "Days: ";
    daysDiv.setAttribute("class", "small-1 column");
    daysDiv.id = "days." + currentPatroller;
    guestDiv.setAttribute("class", "small-2 columns");
    guestDiv.id = "guestDiv." + currentPatroller;
    inputGuest.type = "text";
    inputGuest.id = "guest." + currentPatroller;
    inputGuest.placeholder = "Guest";

	document.getElementById(team).appendChild(row);
    document.getElementById(row.id).appendChild(radioDiv);
    document.getElementById(radioDiv.id).appendChild(inputRadio);
    document.getElementById(row.id).appendChild(patrollerDiv);
    document.getElementById(patrollerDiv.id).appendChild(inputPatrollerID);
    document.getElementById(row.id).appendChild(patrollerRating);
    document.getElementById(row.id).appendChild(patrollerTime);
    document.getElementById(row.id).appendChild(daysDivLabel);
    document.getElementById(row.id).appendChild(shiftDiv);
    document.getElementById(row.id).appendChild(daysDiv);
    document.getElementById(row.id).appendChild(guestDiv);
    document.getElementById(guestDiv.id).appendChild(inputGuest);
}

function setPatrollersArray() {
	/** @type {Array.<string>} */
	var lines = [];
	$.ajax({
		url: 'data/patrollers.csv',
		contentType: "text/csv",
		async: false,
		success: function(text) {
			lines = text.split(/\n/);
			return;
		}
	});
	for (var i = 0; i < lines.length; i++) {
		patrollers[i] = lines[i].split(",");
	}
}

window.onload = function() {
	/** @constant */
	var MAX_TEAM = 5;
	document.getElementById("date").innerHTML = getDate();
	setPatrollersArray();
	setDayNight();
	for (var i = 1; i <= MAX_TEAM; i++) {
		prepPatroller(document.getElementById("patrollerID." + i + ".1"));
        displayAM("shift." + i + ".1");
	}
};
