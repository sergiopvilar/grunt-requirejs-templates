if(typeof define !== "function"){
	var define = require("requirejs");
}

define([], function () {

    var Template = '<h1 class="main">Hi, there!</h1><ul><% for(var i in data){ %><li><%=data[i]%></li><% } %></ul>';    

	return Template;

});