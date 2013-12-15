if(typeof define !== "function"){
	var define = require("requirejs");
}

define(['text!templates/handlebars.html'], function (Template) {    

	return Template;

});