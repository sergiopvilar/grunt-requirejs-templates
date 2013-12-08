grunt-requirejs-templates
=========================

> A plugin to insert the content of template files like underscore, handlebars to variables into the javascript code

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-templates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-templates');
```

## What it does

Supposing that you have your template files in a separated folder and loads them with Require.js like this:

```js
define([
    'text!templates/myTemplate.html'        
], function (Template) {
	
	var html = _.template(Template)({name: "Sergio"});
	
});
```

The grunt-requirejs gets the content of the template file and put it into a string to prevent your application to make a XMLHttpRequest to load it:

```js
define([
], function () {
	
	var Template = '<p>This is my template file, <%=name%>!</p>';
	var html = _.template(Template)({name: "Sergio"});
	
});
```


## The "requirejs_templates" task

### Overview
In your project's Gruntfile, add a section named `requirejs_templates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs_templates: {
    dist: {
      options: {
        // your options here
      },
    }
  }
});
```

### Options

#### options.appDir
Type: `String`
Default value: `''`

Path to your application

#### options.scripts
Type: `String`
Default value: `''`

Path to your javascript files

#### options.templates
Type: `String`
Default value: `''`

Path to your template files

### Usage Examples

```js
define({
  requirejs_templates: {
    dist: {
      options: {
        appDir: "app",
        scripts: "scripts",
        templates: "templates"
      },
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
=======