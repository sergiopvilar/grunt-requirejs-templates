if(typeof define !== "function"){
	var define = require("requirejs");
}

define([], function () {

    var Template = '<h1 class="main">Hi, there!</h1><ul><% _.each(data, function(item){ %><li><%=item%></li><% }); %></ul>';    

	return Template;

});