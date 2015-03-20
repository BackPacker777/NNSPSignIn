/**
 *  AUTHOR: HB
 *  VERSION: 1.0
 *  CREATED: 02.12.2015
 *  ASSIGNMENT: JS OOP demo
 */

"use strict";

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