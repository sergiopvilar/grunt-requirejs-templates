if(typeof define !== "function"){
	var define = require("requirejs");
}

define([], function () {

    var Template = '<h1 class="main">Hi, there!</h1><ul>{#data}<li>{.}</li>{/data}</ul>';    

	return Template;

});