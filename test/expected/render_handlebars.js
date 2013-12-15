if(typeof define !== "function"){
	var define = require("requirejs");
}

define([], function () {

    var Template = '<h1 class="main">Hi, there!</h1><ul>{{#each data}}<li>{{this}}</li>{{/each}}</ul>';    

	return Template;

});