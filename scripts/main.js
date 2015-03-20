/**
 *   AUTHOR: HB
 *   VERSION: 1.0
 *   CREATED: 02.12.2015
 *   ASSIGNMENT: Project 3 JS Code
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

function prepPatroller(teamNum) {
	teamNum.addEventListener('change', populatePatroller);
}

function populatePatroller() {
	patroller = event.target.id;
	/** @type {string} */
	var level,
		element = document.getElementById(patroller);

	/** @const */
	var 	LAST = 0,
		FIRST = 1,
		ID = 2,
		LEVEL = 3,
		DAYS = 4;

	/** @type {number} */
	var exists = 0;

	/** @type {Array.<string>} */
	var elementId = patroller.split('.');
	for (var i = 0; i < patrollers.length; i++) {
		if (element.value == patrollers[i][ID]) {
			document.getElementById("patroller." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + patrollers[i][FIRST] + " " + patrollers[i][LAST] + "</h4>";
			if (patrollers[i][LEVEL] == 1) {
				level = "Basic";
			} else if (patrollers[i][LEVEL] == 2) {
				level = "Senior";
			} else {
				level = "Certified";
			}
			document.getElementById("level." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + level + "</h4>";
			var minutes = date.getMinutes();
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
	var team = ('team' + teamNum);
	var row = document.createElement("div");
	row.setAttribute('class', 'row fullWidth');
	var rowContents =   '<div class="small-1 columns">' +
						'<input type="number" maxlength="2" required="1" id="radioNum.' + teamNum + '.' + patrollerNum + '" placeholder="Radio Number" />' +
					'</div>' +
					'<div class="small-2 columns" id="patroller.' + teamNum + '.' + patrollerNum + '" >' +
						'<input type="number" maxlength="5" id="patrollerID.' + teamNum + '.' + patrollerNum + '" placeholder="ID Num" />' +
					'</div>' +
					'<div class="small-1 column" id="level.' + teamNum + '.' + patrollerNum + '"></div>' +
					'<div class="small-1 column" id="time.' + teamNum + '.' + patrollerNum + '"></div>' +
					'<span class="label left">Days:</span><div class="small-1 column" id="days.' + teamNum + '.' + patrollerNum + '"></div>' +
					'<div class="small-2 columns">' +
						'<input type="text" id="guest.' + teamNum + '.' + patrollerNum + '" placeholder="Guest" />' +
					'</div>';
	row.innerHTML = rowContents;
	document.getElementById(team).appendChild(row);
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
	prepPatroller(document.getElementById("patrollerID.1.1"));
	prepPatroller(document.getElementById("patrollerID.2.1"));
	prepPatroller(document.getElementById("patrollerID.3.1"));
	prepPatroller(document.getElementById("patrollerID.4.1"));
	prepPatroller(document.getElementById("patrollerID.5.1"));
};
