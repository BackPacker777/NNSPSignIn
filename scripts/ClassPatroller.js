/**
 *  AUTHOR: HB
 *  VERSION: 1.0
 *  CREATED: 02.12.2015
 *  ASSIGNMENT: JS OOP demo
 */

"use strict";

function Patroller(id, lastName, firstName, level, days) {
	/** @type {number} */
	var _id = id,
		_level = level,
		_days = days;
		
	/** @type {string} */
	var _lastName = lastName,
		_firstName = firstName;
	
	this.getId = function() {
		return _id;
	};
	
	this.getLastName = function() {
		return _lastName;
	};
	
	this.getFirstName = function() {
		return _firstName;
	};
	
	this.getLevel = function() {
		return _level;
	};
	
	this.setDays = function(dayAddValue) {
		_days = _days + dayAddValue;
	};
	
	this.getDays = function() {
		return _days;
	};
}