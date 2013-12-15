if(typeof define !== "function"){
	var define = require("requirejs");
}

define(['text!templates/underscore.html'], function (Template) {    

	return Template;

});