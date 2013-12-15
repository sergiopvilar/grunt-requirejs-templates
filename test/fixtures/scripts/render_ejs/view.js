if(typeof define !== "function"){
	var define = require("requirejs");
}

define(['text!templates/ejs.ejs'], function (Template) {    

	return Template;

});