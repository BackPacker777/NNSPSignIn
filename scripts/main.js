/**
 *   AUTHOR: HB
 *   VERSION: 1.0
 *   CREATED: 02.12.2015
 *   ASSIGNMENT: Project 3 JS Code
 */

"use strict";

/** @type {Array} */
var patrollers = [];

/** @type {number} */
var t1Counter, t2Counter, t3Counter, t4Counter;

function getDate() {
	/** @type {Date} */
	var date = new Date(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		year = date.getFullYear(),
		weekDay = date.getDay(),
		fullDate = (month + "/" + day + "/" + year);
	document.getElementById("weekDay").innerHTML = getWeekDay(weekDay);
	return fullDate;
}

function getWeekDay(weekDay) {
	/** @type {Array.<string>} */
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[weekDay];
}

function getPatroller(patroller) {
	var element = document.getElementById(patroller);
	/** @type {Date} */
	var date = new Date();
	/** @const */
	var ID = 2,
		LAST = 0,
		FIRST = 1,
		LEVEL = 3;
	/** @type {number} */
	var counter = 0;
	/** @type {string} */
	var level;
	/** @type {Array.<string>} */
	var elementId = patroller.split('.');
	for (var j = 0; j < patrollers.length; j++) {
		if (element.value == patrollers[j][ID]) {
			document.getElementById("patroller." + elementId[1] + "." + elementId[2]).innerHTML = "<h4>" + patrollers[j][FIRST] + " " + patrollers[j][LAST] + "</h4>";
			if (patrollers[j][LEVEL] == 1) {
				level = "Basic";
			} else if (patrollers[j][LEVEL] == 2) {
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
			//patrollers.splice(patrollers[j], 1); //remove array element
			break;
		} else {
			//Do something here if number already in use.
		}
	}
	elementId[2]++;
	/** @type {boolean} */
	var addTeam = setCounter(elementId[1]);
	if (addTeam === true) {
		addPatroller(elementId[1], elementId[2]);
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
	} else {
		if (typeof t4Counter == 'undefined') {
			t4Counter = 1;
		}
		if (t4Counter < MAX_TEAM) {
			t4Counter++;
			return true;
		} else {
			return false;
		}
	}
}

function addPatroller(teamNum, patroller) {
	var team = ('team' + teamNum);
	var row = document.createElement("div");
	row.setAttribute('class', 'row fullWidth');
	var rowContents =   '<div class="small-2 columns">' +
						'<input type="number" maxlength="2" required="1" id="radioNum.' + teamNum + '.' + patroller + '" placeholder="Radio Number" />' +
					'</div>' +
					'<div class="small-2 columns" id="patroller.' + teamNum + '.' + patroller + '" >' +
						'<input type="number" maxlength="5" id="patrollerID.' + teamNum + '.' + patroller + '" placeholder="ID Num" onchange="getPatroller(this.id)" />' +
					'</div>' +
					'<div class="small-2 column" id="level.' + teamNum + '.' + patroller + '"></div>' +
					'<div class="small-1 column" id="time.' + teamNum + '.' + patroller + '"></div>' +
					'<div class="small-2 columns">' +
						'<input id="mealTicket.' + teamNum + '.' + patroller + '" type="checkbox"><label for="mealTicket.' + teamNum + '.' + patroller + '">Meal Ticket?</label>' +
					'</div>' +
					'<div class="small-2 columns">' +
						'<input type="text" id="guest.' + teamNum + '.' + patroller + '" placeholder="Guest" />' +
					'</div>';
	row.innerHTML = rowContents;
	document.getElementById(team).appendChild(row);
}

function setPatrollers() {
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
	document.getElementById("date").innerHTML = getDate();
	setPatrollers();
};
