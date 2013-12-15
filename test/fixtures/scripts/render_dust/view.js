if(typeof define !== "function"){
	var define = require("requirejs");
}

define(['text!templates/dust.html'], function (Template) {    

	return Template;

});